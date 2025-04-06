"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Shield, LogOut, Play, Pause, RefreshCw, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/src/components/theme-toggle"
import { Alert, AlertDescription } from "@/src/components/ui/alert"
import { Progress } from "@/src/components/ui/progress"

export default function AdminDashboardPage() {
  const [serverStatus, setServerStatus] = useState<"offline" | "Checking" | "online">("offline")
  const [ngrokUrl, setNgrokUrl] = useState<string>("")
  const [startingProgress, setStartingProgress] = useState(0)
  const [userCount, setUserCount] = useState(0)
  const [documentsProcessed, setDocumentsProcessed] = useState(0)
  // const [apiKey, setApiKey] = useState("sk-*****************************")
  // const [showApiKey, setShowApiKey] = useState(false)
  const [colabUrl, setColabUrl] = useState(
    "https://colab.research.google.com/drive/1KqWE9xvlo4Y--za7KA8HnhuWIfz5zRRx#scrollTo=z7QYNEd3Ql3N",
  )
  const router = useRouter()

  // Simulate fetching stats
  useEffect(() => {
    setUserCount(127)
    setDocumentsProcessed(843)
  }, [])

  async function fetchColabData() {
    try {
      const response = await fetch('/api/colabData');
      if (!response.ok) {
        throw new Error('Failed to fetch data from Colab');
      }
      const data = await response.json();
      setNgrokUrl(data.ngrokUrl)
      localStorage.setItem("url",data.ngrokUrl);
    } catch (err) {
      console.log("error occur");
    }
  }

  async function shutdown() {
    try {
      const response = await fetch('/api/colabData?action=shutdown');
      if (!response.ok) {
        throw new Error('Failed to shutdown Colab do manually');
      }
      
      setNgrokUrl("")
      localStorage.removeItem("url");
      return true
    } catch (err) {
      console.log("error occur while shutdown");
    }
  }


  async function check() {
    try {
      const response = await fetch('/api/colabData?action=health');
      if (!response.ok) {
        throw new Error('Failed to check Colab status');
      }
      return 1;
      
    } catch (err) {
      console.log("error occur while chekcing health");
    }
  }

  useEffect(() => {
   
    fetchColabData();
  }, []);

  const startServer = () => {
    setServerStatus("Checking")
    
    // Simulate server starting progress
    let progress = 0
    fetchColabData()
    const interval = setInterval(() => {
      progress += 5
      setStartingProgress(progress)

      if (ngrokUrl !="") {
        clearInterval(interval)
        setServerStatus("online")
        

        // Simulate API call to update server status in the app
        console.log("API call: Server is now online")
      }
      else{
        if(progress>100){
          clearInterval(interval)
          setServerStatus("offline")
        }


      }
    }, 300)
  }

  const stopServer = async() => {
  const k=await shutdown()
  if(k){
    setServerStatus("offline")
    console.log("API call: Server is now offline")
  }
  

    
  }

  const refreshServerStatus = async() => {
    // Simulate checking server status
    console.log("Checking server status...")
    const k=await check()

    // For demo purposes, toggle between online and offline
    if (k) {
      console.log("server is running ")
    } else {
      console.log("server is stop ")
      
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Shield className="h-6 w-6" />
            <span>ContractSafe</span>
            <span className="text-sm font-normal bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => router.push("/login")}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your ContractSafe instance</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                <div
                  className={`h-3 w-3 rounded-full ${
                    serverStatus === "online"
                      ? "bg-emerald-500"
                      : serverStatus === "Checking"
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                ></div>
                <span className="text-sm font-medium">
                  {serverStatus === "online"
                    ? "Server Online"
                    : serverStatus === "Checking"
                      ? "Server Checking"
                      : "Server Offline"}
                </span>
              </div>

              <Button variant="outline" size="icon" onClick={refreshServerStatus}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Active user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userCount}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Documents Processed</CardTitle>
                <CardDescription>Total documents analyzed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{documentsProcessed}</div>
              </CardContent>
            </Card>

            <Card className={serverStatus === "online" ? "border-emerald-500" : "border-red-500"}>
              <CardHeader className="pb-2">
                <CardTitle>Server Status</CardTitle>
                <CardDescription>Google Colab connection</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div
                    className={`h-4 w-4 rounded-full ${
                      serverStatus === "online"
                        ? "bg-emerald-500"
                        : serverStatus === "Checking"
                          ? "bg-amber-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-medium">
                    {serverStatus === "online" ? "Online" : serverStatus === "Checking" ? "Checking" : "Offline"}
                  </span>
                </div>

                {serverStatus === "Checking" && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Starting server...</span>
                      <span>{startingProgress}%</span>
                    </div>
                    <Progress value={startingProgress} className="h-1" />
                  </div>
                )}

                {serverStatus === "online" && ngrokUrl && (
                  <div className="mt-2">
                    <p className="text-xs text-muted-foreground mb-1">Ngrok URL:</p>
                    <div className="flex items-center gap-2 bg-muted p-2 rounded text-xs font-mono overflow-hidden">
                      <span className="truncate">{ngrokUrl}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={() => navigator.clipboard.writeText(ngrokUrl)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                {serverStatus === "offline" ? (
                  <Button onClick={startServer} className="w-full gap-2">
                    <Play className="h-4 w-4" />
                    Start Server
                  </Button>
                ) : (
                  <Button onClick={stopServer} variant="destructive" className="w-full gap-2">
                    <Pause className="h-4 w-4" />
                    Stop Server
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Google Colab Integration</CardTitle>
                <CardDescription>Connect to your Colab notebook</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="colab-url">Google Colab URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="colab-url"
                      value={colabUrl}
                      type="password"
                      onChange={(e) => setColabUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" onClick={() => window.open(colabUrl, "_blank")}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter the URL of your Google Colab notebook that runs the analysis server
                  </p>
                </div>

                {/* <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input
                      id="api-key"
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={() => setShowApiKey(!showApiKey)} className="whitespace-nowrap">
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    API key for authentication between the app and Colab server
                  </p>
                </div> */}

                <div className="pt-2">
                  <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-900">
                    <AlertDescription className="text-amber-800 dark:text-amber-300 text-sm">
                      <strong>Important:</strong> Make sure your Google Colab notebook is configured to use ngrok for
                      exposing the API endpoint.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Configuration</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Server Instructions</CardTitle>
                <CardDescription>How to set up the analysis server</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    <p className="font-medium">Open Google Colab</p>
                    <p className="text-sm text-muted-foreground">Navigate to your notebook or create a new one</p>
                  </li>
                  <li>
                    <p className="font-medium">run required cells</p>
                    <div className="bg-muted p-2 rounded text-xs font-mono mt-1">
                      run all the cells 
                    </div>
                  </li>
                  
                  <li>
                    <p className="font-medium">Run the server code</p>
                    <p className="text-sm text-muted-foreground">
                      Execute the cells in the notebook to start the server
                    </p>
                  </li>
                  <li>
                    <p className="font-medium">Once URL shows in the notebook</p>
                    <p className="text-sm text-muted-foreground">
                     come back to admin and check once again , so that the service accesble to users 
                    </p>
                  </li>
                </ol>

                <div className="pt-2">
                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900">
                    <AlertDescription className="text-blue-800 dark:text-blue-300 text-sm">
                      <strong>Tip:</strong> Use a GPU runtime in Colab for faster document analysis.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(colabUrl, "_blank")}
                >
                  Open Google Colab
                </Button>
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

