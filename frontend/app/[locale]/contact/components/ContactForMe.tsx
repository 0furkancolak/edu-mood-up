"use client";
import React, { useState } from "react";
import Motion from "../../../../components/motion";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactAction } from "@/app/action/contact";

export default function ContactForMe() {
  const t = useTranslations("ContactForMe");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const formData = {
    email,
    name,
    message,
  };

  const resetMsg = () => {
    setName("");
    setEmail("");
    setMessage("");
  };

  async function handleSubmit(event: any) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await contactAction(formData);
      toast({
        title: "En yakın zamanda sizinle iletişime geçeceğiz.",
      });
      resetMsg();
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast({
        title: "Lütfen daha sonra tekrar deneyiniz.",
        variant: "destructive",
      });
      resetMsg();
      setLoading(false);
    }
  }

  return (
    <Motion
      initial={{ opacity: 0, y: +100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            className="w-72 bg-white rounded-lg py-6"
            type="text"
            placeholder={t("name")}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Input
            className="w-72 bg-white rounded-lg py-6"
            type="email"
            placeholder={t("email")}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            value={email}
          />
        </div>
        <Textarea
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("message")}
          className=" bg-white rounded-lg"
        />
        <button
          type="submit"
          className={`${
            loading
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white flex items-center justify-center py-3 px-8 rounded-lg font-bold  transition-colors duration-300`}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white "></div>
          ) : (
            t("send")
          )}
        </button>
      </form>
    </Motion>
  );
}
