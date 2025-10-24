"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import Image from "next/image";
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (value: LoginFormValues) => {
        // Handle login logic here
        // console.log("Login data:", value);
        await authClient.signIn.email({
            email: value.email,
            password: value.password,
            callbackURL: "/",
        },
        {
            onSuccess: ()=>{
                router.push("/");
            },
            onError: (ctx)=>{
                toast.error(`Error: ${ctx.error.message}`);
                // Optionally, you can add more error handling logic here
            }
        }
    );
        // toast.success("Login successful!");
        // router.push("/");
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="flex flex-col gap-6">

            <Card className={cn("w-full max-w-md mx-auto")}>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-center">Login to Your Account</CardTitle>
                    <CardDescription className="text-center">
                        Welcome back! Please enter your details.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >Continue with Github</Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        type="button"
                                        disabled={isPending}
                                    >Continue with Google</Button>
                                </div>
                                <div className="grid gap-6">

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your email"
                                                        type="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter your password"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        className="w-full"
                                        type="submit"
                                        disabled={isPending}
                                    >
                                        Login
                                    </Button>

                                </div>
                                <div className="text-center text-sm">
                                    Don't have an account?{' '}
                                    <Link href="/signup" className="underline underline-offset-4">Sign up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )

}
