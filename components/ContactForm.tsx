'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqearqqd");

  if (state.succeeded) {
    return (
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4">
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
    <section id="contact" className="py-24 bg-white bg-dot-grid">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Solicita una demo personalizada</h2>
          <p className="mt-4 text-gray-600">
            Déjanos tus datos y te mostraremos cómo AlertSil puede proteger a tu equipo en menos de 5 minutos.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-10 rounded-2xl border border-gray-100 shadow-xl text-black"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </motion.form>
      </div>
    </section>
  );
}
