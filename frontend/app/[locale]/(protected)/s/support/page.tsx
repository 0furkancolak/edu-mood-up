"use client"
import React from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  subject: z.string().min(5, "Konu en az 5 karakter olmalıdır"),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalıdır"),
})

type FormValues = z.infer<typeof formSchema>

export default function SupportPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  function onSubmit(data: FormValues) {
    console.log(data)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Destek</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">İletişim Formu</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
              
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className='col-span-1'>
                    <FormLabel>Adınız</FormLabel>
                    <FormControl>
                      <Input placeholder="Adınızı giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className='col-span-1'>
                    <FormLabel>E-posta</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="E-posta adresinizi giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Konu</FormLabel>
                    <FormControl>
                      <Input placeholder="Konuyu giriniz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Mesajınız</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Mesajınızı buraya yazın..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">Gönder</Button>
            </form>
          </Form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">İletişim Bilgileri</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">E-posta</h3>
              <p className="text-gray-600">destek@edumoodup.com</p>
            </div>
            <div>
              <h3 className="font-medium">Çalışma Saatleri</h3>
              <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
