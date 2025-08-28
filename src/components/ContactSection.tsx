import "react-datepicker/dist/react-datepicker.css";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { IFormData } from "@/interfaces";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  faCalendarDays,
  faEnvelope,
  faPaperPlane,
  faPhone,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

gsap.registerPlugin(ScrollTrigger);

const painOptions = [
  { value: "", label: "Selecione uma opção" },
  { value: "dor-cabeca", label: "Dor de cabeça" },
  { value: "dor-costas", label: "Dor nas costas" },
  { value: "dor-pescoco", label: "Dor no pescoço" },
  { value: "dor-joelho", label: "Dor no joelho" },
  { value: "outros", label: "Outros" },
];

const ContactSection = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IFormData>();
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray(".contact-animate");

      elements.forEach((el: any, idx) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: idx * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reset",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<IFormData> = async () => {
    setSubmissionSuccess(false);
    setSubmissionError(false);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmissionSuccess(true);
      reset();
    } catch (error) {
      setSubmissionError(true);
      console.error("Form submission error:", error);
    }
  };

  return (
    <section
      id="agendamento"
      ref={sectionRef}
      style={{ backgroundColor: "#4a4a4a", color: "#f9f9f9" }}
      className="py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-2/3 contact-animate">
            <div
              style={{
                backgroundColor: "#6d6d6d",
                border: "1px solid #4a4a4a",
              }}
              className="p-8 md:p-10 rounded-xl shadow-2xl"
            >
              <h3 style={{ color: "#D1B046" }} className="text-4xl font-extrabold mb-4">
                Agendar consulta
              </h3>
              <p className="mb-8 text-lg">
                Preencha o formulário abaixo para agendar uma consulta ou tirar suas dúvidas.
                Retornaremos o contato em breve!
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Campos com animação */}
                {[
                  {
                    label: "Nome Completo",
                    icon: faUser,
                    field: "name",
                    placeholder: "Seu nome",
                  },
                  {
                    label: "Email",
                    icon: faEnvelope,
                    field: "email",
                    placeholder: "seu.email@exemplo.com",
                  },
                  {
                    label: "Telefone",
                    icon: faPhone,
                    field: "phone",
                    placeholder: "(XX) XXXX-XXXX",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="contact-animate">
                    <label className="block text-sm font-medium mb-2">
                      <div className="flex items-center gap-2">
                        <FontAwesomeIcon icon={item.icon} style={{ color: "#D1B046" }} />
                        {item.label}
                      </div>
                    </label>
                    <input
                      type={item.field === "email" ? "email" : "text"}
                      {...register(item.field as keyof IFormData, {
                        required: `${item.label} é obrigatório.`,
                      })}
                      placeholder={item.placeholder}
                      className="w-full px-4 py-3 rounded-lg transition-colors duration-200"
                      style={{
                        backgroundColor: "#4a4a4a",
                        border: "1px solid #6d6d6d",
                        color: "#f9f9f9",
                      }}
                    />
                    {errors[item.field as keyof IFormData] && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors[item.field as keyof IFormData]?.message as string}
                      </p>
                    )}
                  </div>
                ))}

                {/* Data */}
                <div className="contact-animate">
                  <label className="block text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCalendarDays} style={{ color: "#D1B046" }} />
                      Melhor dia para consulta
                    </div>
                  </label>
                  <Controller
                    control={control}
                    name="consultationDate"
                    rules={{ required: "Por favor, selecione uma data." }}
                    render={({ field }) => (
                      <DatePicker
                        placeholderText="Selecione uma data"
                        onChange={(date: Date | null) => field.onChange(date)}
                        selected={field.value}
                        dateFormat="dd/MM/yyyy"
                        className="w-full px-4 py-3 rounded-lg cursor-pointer bg-[#4a4a4a] border border-[#6d6d6d] text-[#f9f9f9]"
                      />
                    )}
                  />
                  {errors.consultationDate && (
                    <p className="mt-2 text-sm text-red-400">{errors.consultationDate.message}</p>
                  )}
                </div>

                {/* Assunto */}
                <div className="contact-animate">
                  <label className="block text-sm font-medium mb-2">
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faTag} style={{ color: "#D1B046" }} />
                      Área da Dor / Assunto
                    </div>
                  </label>
                  <select
                    {...register("painArea", {
                      required: "Por favor, selecione uma área.",
                    })}
                    className="w-full px-4 py-3 rounded-lg transition-colors duration-200"
                    style={{
                      backgroundColor: "#4a4a4a",
                      border: "1px solid #6d6d6d",
                      color: "#f9f9f9",
                    }}
                  >
                    {painOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.painArea && (
                    <p className="mt-2 text-sm text-red-400">{errors.painArea.message}</p>
                  )}
                </div>

                {/* Mensagem */}
                <div className="contact-animate">
                  <label className="block text-sm font-medium mb-2">Sua Mensagem / Descrição</label>
                  <textarea
                    rows={4}
                    {...register("description", {
                      required: "A descrição é obrigatória.",
                    })}
                    placeholder="Descreva brevemente sua necessidade ou dor..."
                    className="w-full px-4 py-3 rounded-lg transition-colors duration-200 resize-y"
                    style={{
                      backgroundColor: "#4a4a4a",
                      border: "1px solid #6d6d6d",
                      color: "#f9f9f9",
                    }}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
                  )}
                </div>

                {/* Botão */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed contact-animate"
                  style={{ backgroundColor: "#D1B046", color: "#4a4a4a" }}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} spin className="h-5 w-5" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      Enviar Mensagem
                    </>
                  )}
                </button>

                {submissionSuccess && (
                  <p className="mt-4 text-center text-green-400 text-lg">
                    Mensagem enviada com sucesso! Em breve entraremos em contato.
                  </p>
                )}
                {submissionError && (
                  <p className="mt-4 text-center text-red-400 text-lg">
                    Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Lateral */}
          <div className="lg:w-1/3 flex flex-col justify-center p-4 lg:p-0 text-left contact-animate">
            <p className="text-lg mb-2" style={{ color: "#D1B046" }}>
              Precisa de ajuda?
            </p>
            <h2 className="text-4xl font-extrabold mb-4">Fale Conosco</h2>
            <p className="text-lg mb-6 max-w-sm">
              Estamos à disposição para atendê-lo com atenção e cuidado.
            </p>
            <hr className="border-t border-[#6d6d6d] w-full mb-6" />
            <a
              href="https://wa.me/553496820404"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-2xl font-bold mb-4 hover:underline"
              style={{ color: "#D1B046" }}
            >
              <FontAwesomeIcon icon={faWhatsapp} size="lg" />
              (34) 9682-0404
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
