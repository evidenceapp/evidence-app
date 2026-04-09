"use client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

import { IFormData } from "@/interfaces";

gsap.registerPlugin(ScrollTrigger);

const painOptions = [
  { value: "", label: "Selecione uma área" },
  { value: "coluna", label: "Coluna / Costas" },
  { value: "joelho", label: "Joelho" },
  { value: "ombro", label: "Ombro" },
  { value: "pescoco", label: "Pescoço" },
  { value: "quadril", label: "Quadril" },
  { value: "outros", label: "Outros" },
];

const WHATSAPP_NUMBER = "5534997150404";

const ContactSection = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormData>();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".form-field",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    setSubmissionSuccess(false);
    try {
      const painAreaLabel =
        painOptions.find((option) => option.value === data.painArea)?.label || data.painArea;

      const preferredDate = data.consultationDate
        ? format(data.consultationDate, "dd/MM/yyyy", { locale: ptBR })
        : "Não informada";

      const message = [
        "Olá! Gostaria de agendar uma avaliação.",
        "*Solicitação via site*",
        "",
        `*Nome:* ${data.name}`,
        `*Email:* ${data.email}`,
        `*Telefone:* ${data.phone}`,
        `*Data preferencial:* ${preferredDate}`,
        `*Área de interesse:* ${painAreaLabel}`,
        `*Descrição:* ${data.description?.trim() || "Não informada"}`,
      ].join("\n");

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setSubmissionSuccess(true);
      reset();
      setTimeout(() => setSubmissionSuccess(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const inputStyles = {
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(209, 176, 70, 0.2)",
    color: "#F5F5F5",
  };

  return (
    <section
      id="agendamento"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1E2832 0%, #2D3A4A 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.1) 0%, transparent 70%)",
          top: "-200px",
          right: "-100px",
        }}
      />

      <div className="contact-content relative z-10 max-w-4xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="w-12 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-light"
              style={{ color: "#D1B046" }}
            >
              Agendamento
            </span>
            <div
              className="w-12 h-[1px]"
              style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
            />
          </div>

          <h2 className="text-4xl md:text-5xl font-extralight mb-4" style={{ color: "#F5F5F5" }}>
            Agende sua <span style={{ color: "#D1B046", fontWeight: 300 }}>avaliação</span>
          </h2>

          <p
            className="text-base md:text-lg font-light max-w-lg mx-auto"
            style={{ color: "rgba(245, 245, 245, 0.6)" }}
          >
            Preencha o formulário e nossa equipe entrará em contato para confirmar seu horário.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1 - Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label
                className="block text-xs tracking-[0.15em] uppercase mb-3 font-light"
                style={{ color: "rgba(245, 245, 245, 0.7)" }}
              >
                Nome completo
              </label>
              <input
                type="text"
                {...register("name", { required: "Nome é obrigatório" })}
                placeholder="Seu nome"
                className="w-full px-5 py-4 text-sm font-light input-gold-focus"
                style={{
                  ...inputStyles,
                  borderRadius: "2px",
                }}
              />
              {errors.name && (
                <p className="mt-2 text-xs" style={{ color: "#E07A5F" }}>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label
                className="block text-xs tracking-[0.15em] uppercase mb-3 font-light"
                style={{ color: "rgba(245, 245, 245, 0.7)" }}
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email é obrigatório" })}
                placeholder="seu@email.com"
                className="w-full px-5 py-4 text-sm font-light input-gold-focus"
                style={{
                  ...inputStyles,
                  borderRadius: "2px",
                }}
              />
              {errors.email && (
                <p className="mt-2 text-xs" style={{ color: "#E07A5F" }}>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 2 - Phone & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-field">
              <label
                className="block text-xs tracking-[0.15em] uppercase mb-3 font-light"
                style={{ color: "rgba(245, 245, 245, 0.7)" }}
              >
                Telefone
              </label>
              <input
                type="tel"
                {...register("phone", { required: "Telefone é obrigatório" })}
                placeholder="(00) 00000-0000"
                className="w-full px-5 py-4 text-sm font-light input-gold-focus"
                style={{
                  ...inputStyles,
                  borderRadius: "2px",
                }}
              />
              {errors.phone && (
                <p className="mt-2 text-xs" style={{ color: "#E07A5F" }}>
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label
                className="block text-xs tracking-[0.15em] uppercase mb-3 font-light"
                style={{ color: "rgba(245, 245, 245, 0.7)" }}
              >
                Data preferencial
              </label>
              <Controller
                control={control}
                name="consultationDate"
                rules={{ required: "Selecione uma data" }}
                render={({ field }) => (
                  <DatePicker
                    placeholderText="Selecione uma data"
                    onChange={(date: Date | null) => field.onChange(date)}
                    selected={field.value}
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    locale={ptBR}
                    popperPlacement="bottom-start"
                    calendarClassName="luxury-datepicker"
                    dayClassName={() => "luxury-datepicker-day"}
                    wrapperClassName="w-full"
                    customInput={
                      <input
                        className="w-full px-5 py-4 text-sm font-light transition-all duration-300 focus:outline-none cursor-pointer"
                        style={{
                          ...inputStyles,
                          borderRadius: "2px",
                        }}
                      />
                    }
                  />
                )}
              />
              {errors.consultationDate && (
                <p className="mt-2 text-xs" style={{ color: "#E07A5F" }}>
                  {errors.consultationDate.message}
                </p>
              )}
            </div>
          </div>

          {/* Row 3 - Pain Area */}
          <div className="form-field">
            <label
              className="block text-xs tracking-[0.15em] uppercase mb-3 font-light"
              style={{ color: "rgba(245, 245, 245, 0.7)" }}
            >
              Área de interesse
            </label>
            <select
              {...register("painArea", { required: "Selecione uma área" })}
              className="w-full px-5 py-4 text-sm font-light transition-all duration-300 focus:outline-none cursor-pointer appearance-none"
              style={{
                ...inputStyles,
                borderRadius: "2px",
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23D1B046'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1rem center",
                backgroundSize: "1.2rem",
              }}
            >
              {painOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  style={{ background: "#2D3A4A", color: "#F5F5F5" }}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {errors.painArea && (
              <p className="mt-2 text-xs" style={{ color: "#E07A5F" }}>
                {errors.painArea.message}
              </p>
            )}
          </div>

          {/* Row 4 - Description */}
          <div className="form-field">
            <label
              className="block text-xs tracking-[0.15em] uppercase mb-3 font-light"
              style={{ color: "rgba(245, 245, 245, 0.7)" }}
            >
              Conte-nos mais
              <span className="normal-case tracking-normal ml-2 opacity-50">(opcional)</span>
            </label>
            <textarea
              rows={4}
              {...register("description")}
              placeholder="Descreva brevemente sua necessidade..."
              className="w-full px-5 py-4 text-sm font-light input-gold-focus resize-none"
              style={{
                ...inputStyles,
                borderRadius: "2px",
              }}
            />
          </div>

          {/* Submit Button */}
          <div className="form-field pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-4 text-xs tracking-[0.2em] uppercase font-medium hover-gold-button disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#D1B046] flex items-center justify-center gap-3 mx-auto"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Enviando...
                </>
              ) : (
                <>
                  Enviar solicitação
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          {submissionSuccess && (
            <div
              className="text-center py-4 px-6 mt-4"
              style={{
                background: "rgba(209, 176, 70, 0.1)",
                border: "1px solid rgba(209, 176, 70, 0.3)",
              }}
            >
              <p className="text-sm font-light" style={{ color: "#D1B046" }}>
                Solicitação enviada com sucesso! Entraremos em contato em breve.
              </p>
            </div>
          )}
        </form>

        {/* WhatsApp Alternative */}
        <div className="mt-16 text-center">
          <p className="text-sm font-light mb-4" style={{ color: "rgba(245, 245, 245, 0.5)" }}>
            Prefere falar diretamente conosco?
          </p>
          <a
            href="https://wa.me/5534997150404"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 text-xs tracking-[0.15em] uppercase font-light transition-all duration-300 hover:border-[rgba(245,245,245,0.5)] hover:text-[#F5F5F5]"
            style={{
              border: "1px solid rgba(245, 245, 245, 0.2)",
              color: "rgba(245, 245, 245, 0.7)",
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp: (34) 99715-0404
          </a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
