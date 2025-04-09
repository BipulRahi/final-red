"use client";

import type React from "react";
import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/src/components/ui/button";
import { Progress } from "@/src/components/ui/progress";
import {
  FileText,
  Upload,
  AlertCircle,
  X,
  Eye,
  FileImage,
  FileIcon as FilePdf,
} from "lucide-react";
import { Alert, AlertDescription } from "@/src/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription, // Import DialogDescription
} from "@/src/components/ui/dialog";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    console.log("onDrop triggered");
    if (fileRejections.length > 0) {
      console.log("File rejections:", fileRejections);
      setError(
        "Invalid file format. Please upload a PDF or image file (JPG, PNG)."
      );
      return;
    }

    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      console.log("Accepted file:", selectedFile);
      setFile(selectedFile);
      setError(null);

      // Determine file type
      const type = selectedFile.type;
      setFileType(type);
      console.log("File type:", type);

      // Create preview for images
      if (type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setFilePreview(reader.result as string);
          console.log("Image preview created");
          console.log("filePreview value:", reader.result); // ADD THIS LOG
        };
        reader.readAsDataURL(selectedFile);
      } else if (type === "application/pdf") {
        setFilePreview(null);
        console.log("PDF selected, no thumbnail preview");
        console.log("filePreview value:", null); // Keep this for clarity
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
    noClick: true, // Disable the default click behavior of react-dropzone on the root element
    noKeyboard: true,
    preventDropOnDocument: false,
    onDropRejected: (rejections) => {
      console.log("onDropRejected triggered:", rejections);
      const rejection = rejections[0];
      if (rejection.errors[0].code === "file-too-large") {
        setError("File is too large. Maximum size is 10MB.");
      } else {
        setError(
          "Invalid file format. Please upload a PDF or image file (JPG, PNG)."
        );
      }
    },
  });

  const handleUpload = () => {
    console.log("handleUpload triggered");
    if (!file) {
      console.log("No file selected for upload");
      return;
    }

    setUploading(true);
    console.log("Uploading started");

    // Simulate upload progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);
      console.log("Upload progress:", currentProgress);

      if (currentProgress >= 100) {
        clearInterval(interval);
        console.log("Upload complete (simulated)");
        setTimeout(() => {
          // Redirect to analysis page after upload completes
          router.push("/dashboard/analysis/new");
          console.log("Navigating to /dashboard/analysis/new");
        }, 500);
      }
    }, 300);
  };

  const clearFile = () => {
    console.log("clearFile triggered");
    setFile(null);
    setFilePreview(null);
    setFileType(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      console.log("File input ref cleared");
    }
  };

  const handleBrowseClick = (e: React.MouseEvent) => {
    console.log("handleBrowseClick triggered");
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically trigger click on the hidden input
      console.log("fileInputRef.current.click() called from handleBrowseClick");
    }
  };

  const getFileIcon = () => {
    if (!fileType) {
      console.log("No fileType, returning default icon");
      return <FileText className="h-5 w-5 text-muted-foreground" />;
    }

    if (fileType.startsWith("image/")) {
      console.log("File type is image, returning image icon");
      return <FileImage className="h-5 w-5 text-blue-500" />;
    } else if (fileType === "application/pdf") {
      console.log("File type is PDF, returning PDF icon");
      return <FilePdf className="h-5 w-5 text-red-500" />;
    }

    console.log("Unknown file type, returning default icon");
    return <FileText className="h-5 w-5 text-muted-foreground" />;
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto h-5 w-5 p-0"
                onClick={() => setError(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        {...getRootProps()}
        className="relative cursor-pointer"
        onClick={() => {
          console.log("Drag & drop area clicked");
          if (fileInputRef.current) {
            fileInputRef.current.click(); // Programmatically trigger click on the hidden input
            console.log("fileInputRef.current.click() called from drag & drop area");
          }
        }}
      >
        <motion.div
          whileHover={{ scale: 1.01, borderColor: "var(--primary)" }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} ref={fileInputRef} style={{ display: 'none' }} />
          <div className="flex flex-col items-center justify-center space-y-2">
            <motion.div
              animate={{
                y: isDragActive ? [0, -5, 0] : 0,
              }}
              transition={{
                repeat: isDragActive ? Number.POSITIVE_INFINITY : 0,
                duration: 1.5,
              }}
            >
              <Upload className="h-8 w-8 text-muted-foreground" />
            </motion.div>
            <p className="text-sm font-medium">
              {isDragActive ? "Drop the file here" : "Drag & drop or click to upload"}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports PDF, JPG, PNG (max 10MB)
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleBrowseClick}
              className="mt-2"
            >
              Browse Files
            </Button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {file && !uploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="border rounded-lg overflow-hidden"
          >
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getFileIcon()}
                <div>
                  <p className="font-medium text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {fileType && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPreview(true)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={clearFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {filePreview && fileType?.startsWith("image/") && (
              <div className="p-3 flex justify-center bg-muted/30">
                <img
                  src={filePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-40 object-contain rounded-md"
                />
              </div>
            )}

            {fileType === "application/pdf" && !filePreview && (
              <div className="p-3 flex justify-center bg-muted/30">
                <div className="flex flex-col items-center p-4">
                  <FilePdf className="h-16 w-16 text-red-500" />
                  <p className="text-sm text-muted-foreground mt-2">
                    PDF Document
                  </p>
                </div>
              </div>
            )}

            <div className="p-3 flex justify-end">
              <Button onClick={handleUpload} className="w-full sm:w-auto">
                Upload Document
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Uploading...</span>
              <span className="text-sm">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl w-[90vw]">
          <DialogHeader>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogDescription>
              Preview of the selected document.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center items-center min-h-[50vh] bg-muted/30 rounded-md">
            {filePreview && fileType?.startsWith("image/") && (
              <img
                src={filePreview || "/placeholder.svg"}
                alt="Preview"
                className="max-h-[70vh] max-w-full object-contain rounded-md"
              />
            )}
            {fileType === "application/pdf" && file && (
              <div className="w-full h-[70vh]">
                <iframe
                  src={URL.createObjectURL(file)}
                  className="w-full h-full rounded-md"
                  title="PDF Preview"
                />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );}