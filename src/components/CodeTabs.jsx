
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"
import { useState } from "react"

const tabs = [
    {
        name: "npm",
        value: "npm",
        content: "npm install package-particlefx",
    },
    {
        name: "pnpm",
        value: "pnpm",
        content: "pnpm add package-particlefx",
    },
    {
        name: "yarn",
        value: "yarn",
        content: "yarn add package-particlefx",
    },
    {
        name: "bun",
        value: "bun",
        content: "bun add package-particlefx",
    },
]

const CodeTabs = () => {
    const [activeTab, setActiveTab] = useState("npm")
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        const currentTab = tabs.find((tab) => tab.value === activeTab)
        if (currentTab) {
            navigator.clipboard.writeText(currentTab.content)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="w-full max-w-2xl">
            <Tabs
                defaultValue="npm"
                value={activeTab}
                onValueChange={setActiveTab}
                className="gap-0 relative"
            >
                <div className="flex items-center border-b">
                    <TabsList className="rounded-none p-0 bg-transparent w-auto justify-start">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="data-[state=active]:border-primary dark:data-[state=active]:border-primary h-full rounded-none border-0 border-b-2 border-transparent data-[state=active]:shadow-none px-4"
                            >
                                {tab.name}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={copied ? "Copied" : "Copy to clipboard"}
                        className={`ml-auto h-8 w-8 transition-transform duration-200 ${copied ? "scale-90" : "scale-100"}`}
                        onClick={handleCopy}
                    >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        <div className="relative rounded-lg bg-muted/50 border border-border px-4 py-3">
                            <code className="font-mono text-sm break-all">{tab.content}</code>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}

export default CodeTabs
