
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Headphones, MessageSquare, Mail, Book, Bot } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PubertChat from "@/components/PubertChat";
import { useState } from "react";

const supportFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

type SupportFormValues = z.infer<typeof supportFormSchema>;

const Support = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const form = useForm<SupportFormValues>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  function onSubmit(data: SupportFormValues) {
    console.log(data);
    // Here you would typically send the form data to your backend
    toast.success("Support request submitted", {
      description: "We'll get back to you as soon as possible."
    });
    form.reset();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-swap-blue py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              We're Here to Help
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Get the support you need for a smooth accommodation exchange
            </p>
          </div>
        </section>
        
        {/* Support Options */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <Bot className="h-6 w-6 text-swap-blue" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
                <p className="text-gray-600 mb-4">
                  Chat with Pubert, our AI assistant, for instant help and guidance.
                </p>
                <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      Chat with Pubert
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[80vh] p-0">
                    <DialogHeader className="p-6 pb-0">
                      <DialogTitle>Chat with Pubert - AI Assistant</DialogTitle>
                    </DialogHeader>
                    <div className="flex-grow p-6 pt-0">
                      <PubertChat className="h-full" />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <MessageSquare className="h-6 w-6 text-swap-blue" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Chat Support</h2>
                <p className="text-gray-600 mb-4">
                  Chat with our support team for quick answers to common questions.
                </p>
                <Button variant="outline">
                  Start Chat
                </Button>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <Mail className="h-6 w-6 text-swap-blue" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Email Support</h2>
                <p className="text-gray-600 mb-4">
                  Send us a message and we'll respond within 24 hours.
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:hello@swapspot.com">Email Us</a>
                </Button>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-swap-lightBlue p-3 rounded-full">
                    <Book className="h-6 w-6 text-swap-blue" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2">Help Center</h2>
                <p className="text-gray-600 mb-4">
                  Browse our knowledge base for tutorials and guides.
                </p>
                <Button variant="outline">
                  Visit Help Center
                </Button>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a topic" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Question</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="account">Account Issues</SelectItem>
                            <SelectItem value="swap">Swap Problems</SelectItem>
                            <SelectItem value="feedback">Feedback or Suggestions</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Support;
