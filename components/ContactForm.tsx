'use client';
import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm("mqearqqd");

  if (state.succeeded) {
    return (
      <div className="text-center py-12 bg-green-50 rounded-3xl border border-green-100">
        <h3 className="text-2xl font-bold text-green-700">¡Solicitud enviada!</h3>
        <p className="text-gray-700 mt-2">
          Hemos recibido tu petición y te contactaremos para ayudarte a contratar el software.
        </p>
      </div>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Solicita una demo personalizada</h2>
          <p className="mt-4 text-gray-600">
            Déjanos tus datos y te mostraremos cómo AlertSil puede proteger a tu equipo en menos de 5 minutos.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-gray-50 p-8 rounded-3xl border border-gray-100 shadow-sm text-black"
        >
          {/* Datos de contacto */}
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
          </div>

          {/* Empresa */}
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
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
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <ValidationError prefix="Teléfono" field="phone" errors={state.errors} className="text-red-500 text-xs mt-1" />
            </div>
          </div>

          {/* Campo oculto para ayudarte a filtrar en el email */}
          <input type="hidden" name="formType" value="Solicitud contratación software" />

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {state.submitting ? 'Enviando...' : 'Solicitar contratación'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            Al enviar, aceptas que te contactemos para gestionar la contratación. No enviamos spam.
          </p>
        </form>
      </div>
    </section>
  );
}
