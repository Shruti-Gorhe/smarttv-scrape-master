
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ScraperInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
  className?: string;
}

const ScraperInput = ({ onSubmit, isLoading, className }: ScraperInputProps) => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast({
        title: "URL Required",
        description: "Please enter an Amazon Smart TV product URL",
        variant: "destructive",
      });
      return;
    }
    
    if (!isValidAmazonUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid Amazon India Smart TV product URL",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(url);
  };
  
  const isValidAmazonUrl = (url: string) => {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('amazon.in') && url.includes('/dp/');
    } catch (e) {
      return false;
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(
        "w-full max-w-3xl mx-auto glass rounded-xl shadow-lg shadow-blue-200/50 dark:shadow-blue-900/20 animate-fade-in border border-white/40 dark:border-white/5", 
        className
      )}
    >
      <div className="p-8 backdrop-blur-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-medium bg-gradient-to-r from-blue-700 to-blue-500 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent">
              Amazon Smart TV Scraper
            </h2>
            <p className="text-sm text-blue-600/70 dark:text-blue-400/80">
              Enter an Amazon India Smart TV product URL to extract detailed information
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="url"
              placeholder="https://www.amazon.in/dp/PRODUCT_ID"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-11 bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm border-blue-200 dark:border-blue-900/40 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-300 focus:ring-2 ring-blue-300/50 dark:ring-blue-600/30 ring-offset-2"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              className="h-11 px-6 font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? 'Scraping...' : 'Scrape Product'}
            </Button>
          </div>
          
          <div className="text-xs text-blue-500/70 dark:text-blue-400/60">
            Example: https://www.amazon.in/dp/B0C6GJJWF2/
          </div>
        </div>
      </div>
    </form>
  );
};

export default ScraperInput;
