import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, ArrowLeft, CheckCircle, AlertCircle, Send } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  console.log('ForgotPasswordPage loaded');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setMessage(null);
    console.log("Forgot password form submitted:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (data.email === "unknown@example.com") {
      setMessage({ type: 'error', text: "Email address not found. Please check and try again." });
      form.setError("email", { type: "manual", message: "This email address was not found in our system." });
    } else {
      setMessage({ type: 'success', text: `If an account exists for ${data.email}, a password reset link has been sent.` });
      form.reset(); // Clear the form on success
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-stone-200 dark:from-slate-900 dark:to-stone-800 p-4 selection:bg-primary/20">
      <Card className="w-full max-w-md shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="text-center bg-slate-50 dark:bg-slate-800/50 p-6">
          <CardTitle className="text-3xl font-bold text-slate-800 dark:text-slate-100">Forgot Password?</CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">No worries, we'll send you reset instructions.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {message && (
                <Alert variant={message.type === 'success' ? 'default' : 'destructive'} className={message.type === 'success' ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700' : ''}>
                  {message.type === 'success' ? <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" /> : <AlertCircle className="h-4 w-4" />}
                  <AlertTitle className={message.type === 'success' ? 'text-green-700 dark:text-green-300' : ''}>{message.type === 'success' ? 'Instructions Sent' : 'Error'}</AlertTitle>
                  <AlertDescription className={message.type === 'success' ? 'text-green-600 dark:text-green-400' : ''}>{message.text}</AlertDescription>
                </Alert>
              )}
              {!message?.type || message.type === 'error' ? ( // Only show form if no success message or if there was an error
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email-forgot">Enter your Email Address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          <Input
                            id="email-forgot"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10 text-base"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : null }
              
              {(!message?.type || message.type === 'error') && (
                <Button type="submit" className="w-full text-base py-3" disabled={isLoading}>
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Reset Link
                    </>
                  )}
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-slate-50 dark:bg-slate-800/50 p-6 border-t dark:border-slate-700">
          <Button variant="link" asChild className="w-full justify-center">
            <Link to="/login" className="text-slate-600 dark:text-slate-400 hover:text-primary font-medium">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;