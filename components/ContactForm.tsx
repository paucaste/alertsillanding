'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqearqqd");

  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-16 bg-green-50 rounded-2xl border border-green-100 shadow-lg">
            <h3 className="text-2xl font-bold text-green-700">¡Solicitud enviada!</h3>
            <p className="text-gray-700 mt-2">
              Hemos recibido tu petición y te contactaremos para ayudarte a contratar el software.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" as const }}
      >
        <div className="flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-xl">
          {/* Left column — Form (60%) */}
          <div className="w-full lg:w-3/5 bg-white p-8 sm:p-10 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Solicita una demo personalizada
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6 text-black">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre y apellidos
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <ValidationError prefix="Nombre" field="fullName" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email profesional
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="nombre@empresa.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa
                  </label>
                  <input
                    id="company"
                    type="text"
                    name="company"
                    placeholder="Nombre de la empresa"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                  <ValidationError prefix="Empresa" field="company" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono (opcional)
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder="+34 600 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                  />
                  <ValidationError prefix="Teléfono" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
              </div>

              <input type="hidden" name="formType" value="Solicitud contratación software" />

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-blue-600 text-white py-4 rounded-full font-bold hover:bg-blue-500 transition-all transform active:scale-95 disabled:opacity-50 shadow-lg shadow-blue-500/25"
              >
                {state.submitting ? 'Enviando...' : 'Solicitar contratación'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Al enviar, aceptas que te contactemos para gestionar la contratación. No enviamos spam.
              </p>
            </form>
          </div>

          {/* Right column — Info panel (40%) */}
          <div className="relative w-full lg:w-2/5 bg-slate-900 p-8 sm:p-10 lg:p-12 flex flex-col justify-center overflow-hidden">
            {/* Decorative gradient blob */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
              style={{
                background: 'radial-gradient(circle, #3b82f6 0%, #1e40af 50%, transparent 70%)',
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-20 blur-2xl"
              style={{
                background: 'radial-gradient(circle, #60a5fa 0%, #2563eb 60%, transparent 80%)',
              }}
            />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Hablemos</h3>
              <p className="text-slate-300 leading-relaxed mb-10">
                Déjanos tus datos y te mostraremos cómo AlertSil puede proteger a tu equipo en menos de 5 minutos.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                    <EnvelopeIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Email</p>
                    <a
                      href="mailto:info@effizy.es"
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      info@effizy.es
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-600/20">
                    <MapPinIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-400">Ubicación</p>
                    <p className="text-white">España</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
