"use client"

import InputError from "@/Components/InputError"
import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import { Link, useForm } from "@inertiajs/react"
import type { FormEventHandler } from "react"

export default function ForgotPassword({ status }: { status?: string }) {
  const { data, setData, post, processing, errors } = useForm({
    email: "",
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route("password.email"))
  }

  return (
    <div className="flex h-screen bg-black">
      {/* Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10"></div>
        <img src="/images/loginImg.png" alt="Politie achtergrond" className="object-cover h-screen" />
        <div className="absolute inset-0 flex flex-col justify-center items-start p-12 z-20">
          <div className="bg-blue-500 text-white font-bold p-2 rounded mb-4">
            <span className="text-3xl">M</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">MEOS</h1>
          <p className="text-xl text-white/80 max-w-md">
            Mobiel Effectief Op Straat - Het centrale informatiesysteem voor wetshandhaving in Nederland.
          </p>
        </div>
      </div>

      {/* Forgot Password Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center lg:hidden">
              <div className="bg-blue-500 text-white font-bold p-2 rounded mb-4">
                <span className="text-3xl">M</span>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white">Wachtwoord vergeten</h2>
            <p className="mt-2 text-zinc-400">
              Vul je e-mailadres in en we sturen je een link om je wachtwoord te resetten
            </p>
          </div>

          {status && (
            <div
              className="bg-blue-900/50 border border-blue-800 text-blue-300 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <span className="block sm:inline">{status}</span>
            </div>
          )}

          <form onSubmit={submit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <InputLabel htmlFor="email" value="Email" className="text-white" />
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  value={data.email}
                  className="mt-1 block w-full bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 focus:ring-blue-500"
                  autoComplete="username"
                  isFocused={true}
                  onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2 text-red-500" />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-between">
              <Link href={route("login")} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Terug naar inloggen
              </Link>
              <PrimaryButton
                className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded disabled:opacity-50 transition"
                disabled={processing}
              >
                Stuur reset link
              </PrimaryButton>
            </div>
          </form>

          <div className="pt-4 text-center">
            <p className="text-sm text-zinc-500">
              Heb je problemen met het resetten van je wachtwoord?{" "}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Neem contact op
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
