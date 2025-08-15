"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "../ui/form";
import { loginSchema } from "./shema";
import { Spinner } from "../features/spinner";
import FormError from "./form-error";
import { login } from "@/action/auth/login";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [error, setError] = useState<string | undefined>("");

  const [typePassword, setTypePassword] = useState("password");
  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    setError("");
    startTransition(() => {
      login(values.username, values.password).then((data) => {
        console.log(data);
        if (data.ok) {
          window.location.href = "/";
        } else {
          const res = data.json();
          console.log(res);
          setError("erreur");
        }
      });
    });
  }

  const ckeckChange = () => {
    setShowPassword((s) => !s);
    if (typePassword === "password") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="shadow-md w-[500px] max-w-sm">
        {isPending && (
          <CardHeader className="text-center flex flex-col items-center justify-center p-9">
            <CardTitle className="text-xl">Connexion</CardTitle>
            <Spinner size={"lg"} />
          </CardHeader>
        )}
        {!isPending && (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">🔐 Bienvenue Sur Shoper</CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="bfof@gmail.com" {...field} />
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
                          <Input type={typePassword} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {!isPending && (
                    <div className="flex items-center justify-center gap-x-3">
                      <Checkbox
                        id="check"
                        checked={showPassword}
                        onCheckedChange={ckeckChange}
                      />
                      <label htmlFor="check">Afficher le mot de passe</label>
                    </div>
                  )}
                  <FormError message={error} />
                  <Button type="submit" size={"lg"} className="w-full">
                    <span>Se connecter</span>
                  </Button>
                </form>
              </Form>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
