"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function PrivacyPolicyPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".privacy-content",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".privacy-section",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen py-20 px-6"
      style={{
        background: "linear-gradient(180deg, #1E2832 0%, #2D3A4A 50%, #1E2832 100%)",
      }}
    >
      {/* Decorative elements */}
      <div
        className="fixed w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(209, 176, 70, 0.15) 0%, transparent 70%)",
          top: "-150px",
          right: "-150px",
        }}
      />

      <div className="privacy-content max-w-3xl mx-auto">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-light mb-12 transition-all duration-300"
          style={{ color: "rgba(245, 245, 245, 0.5)" }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, { color: "#D1B046", duration: 0.3 });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, { color: "rgba(245, 245, 245, 0.5)", duration: 0.3 });
          }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar ao site
        </a>

        {/* Header */}
        <div className="privacy-section mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div
              className="w-12 h-[1px]"
              style={{ background: "linear-gradient(90deg, transparent, #D1B046)" }}
            />
            <span
              className="text-xs tracking-[0.3em] uppercase font-light"
              style={{ color: "#D1B046" }}
            >
              Legal
            </span>
            <div
              className="w-12 h-[1px]"
              style={{ background: "linear-gradient(90deg, #D1B046, transparent)" }}
            />
          </div>

          <h1
            className="text-4xl md:text-5xl font-extralight mb-4"
            style={{ color: "#F5F5F5" }}
          >
            Política de{" "}
            <span style={{ color: "#D1B046", fontWeight: 300 }}>Privacidade</span>
          </h1>

          <p
            className="text-base font-light leading-relaxed"
            style={{ color: "rgba(245, 245, 245, 0.7)" }}
          >
            A sua privacidade é importante para nós. Esta Política de Privacidade descreve como o{" "}
            <strong style={{ color: "#D1B046", fontWeight: 400 }}>Instituto FisioWellness Evidence</strong> coleta, utiliza e protege as informações
            fornecidas ao utilizar nossa plataforma.
          </p>
        </div>

        {/* Content sections */}
        <div className="space-y-10">
          <Section number="1" title="Quem Utiliza o Login">
            <p>
              O login na plataforma é destinado <strong>exclusivamente para fisioterapeutas credenciados</strong> do
              Instituto FisioWellness Evidence. Nenhum paciente ou visitante precisa criar
              conta ou realizar login para acessar conteúdos públicos.
            </p>
          </Section>

          <Section number="2" title="Informações que Coletamos">
            <p className="mb-4">
              Quando os fisioterapeutas utilizam o login via Instagram, coletamos <strong>apenas</strong> as seguintes
              informações, com consentimento prévio:
            </p>
            <ul>
              <li>O nome de usuário do Instagram (@)</li>
              <li>A foto de perfil pública do Instagram</li>
            </ul>
            <p className="mt-4">
              Nenhuma outra informação, como e-mail, lista de seguidores ou mensagens privadas, é coletada
              ou armazenada pela plataforma.
            </p>
          </Section>

          <Section number="3" title="Dados do Formulário de Contato">
            <p>
              Caso você utilize o formulário de contato na página principal, os dados fornecidos serão
              utilizados <strong>exclusivamente para métricas internas</strong>, com o objetivo de melhorar a qualidade
              do nosso atendimento. <strong>Não comercializamos, vendemos ou compartilhamos</strong> essas informações.
            </p>
          </Section>

          <Section number="4" title="Como Utilizamos os Dados">
            <p className="mb-4">Os dados coletados são utilizados para:</p>
            <ul>
              <li>Identificar fisioterapeutas credenciados na plataforma</li>
              <li>Exibir corretamente o nome de usuário e a foto de perfil do Instagram</li>
              <li>Melhorar a qualidade do atendimento com base nas métricas internas do formulário</li>
            </ul>
          </Section>

          <Section number="5" title="Compartilhamento de Dados">
            <p>
              Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para
              cumprir obrigações legais. O login via Instagram utiliza a integração oficial fornecida pela
              Meta, e os dados acessados respeitam as permissões autorizadas por você.
            </p>
          </Section>

          <Section number="6" title="Segurança das Informações">
            <p>
              Adotamos medidas técnicas e administrativas adequadas para proteger os dados coletados
              contra acessos não autorizados, alteração, divulgação ou destruição.
            </p>
          </Section>

          <Section number="7" title="Direitos do Usuário (LGPD)">
            <p className="mb-4">
              Em conformidade com a Lei Geral de Proteção de Dados (LGPD), os fisioterapeutas e usuários
              do formulário de contato têm o direito de:
            </p>
            <ul>
              <li>Acessar as informações que possuímos sobre você</li>
              <li>Solicitar a correção ou exclusão dos seus dados</li>
              <li>Revogar o consentimento para uso dos seus dados a qualquer momento</li>
            </ul>
          </Section>

          <Section number="8" title="Alterações na Política">
            <p>
              Esta política pode ser atualizada periodicamente. Sempre que houver alterações, publicaremos
              uma nova versão nesta página.
            </p>
          </Section>

          <Section number="9" title="Contato">
            <p>
              Em caso de dúvidas ou solicitações relacionadas a esta Política de Privacidade, você pode
              entrar em contato conosco através do e-mail:{" "}
              <a
                href="mailto:evidenceinstitutoapp@gmail.com"
                className="transition-colors duration-300"
                style={{ color: "#D1B046" }}
              >
                evidenceinstitutoapp@gmail.com
              </a>
            </p>
          </Section>
        </div>

        {/* Footer */}
        <div
          className="privacy-section mt-16 pt-8"
          style={{ borderTop: "1px solid rgba(209, 176, 70, 0.15)" }}
        >
          <p
            className="text-xs font-light tracking-wide"
            style={{ color: "rgba(245, 245, 245, 0.4)" }}
          >
            Última atualização: {new Date().toLocaleDateString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}

function Section({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <div
      className="privacy-section"
      style={{
        paddingLeft: "1.5rem",
        borderLeft: "1px solid rgba(209, 176, 70, 0.2)",
      }}
    >
      <h2
        className="text-lg font-light mb-4 flex items-center gap-3"
        style={{ color: "#F5F5F5" }}
      >
        <span
          className="text-xs font-light tracking-wider"
          style={{ color: "#D1B046" }}
        >
          {number}.
        </span>
        {title}
      </h2>
      <div
        className="text-sm font-light leading-relaxed space-y-3"
        style={{ color: "rgba(245, 245, 245, 0.7)" }}
      >
        <style jsx>{`
          div :global(strong) {
            color: #D1B046;
            font-weight: 400;
          }
          div :global(ul) {
            list-style: none;
            padding-left: 0;
            margin-top: 0.75rem;
          }
          div :global(li) {
            position: relative;
            padding-left: 1.25rem;
            margin-bottom: 0.5rem;
          }
          div :global(li)::before {
            content: "";
            position: absolute;
            left: 0;
            top: 0.6em;
            width: 6px;
            height: 1px;
            background: #D1B046;
          }
        `}</style>
        {children}
      </div>
    </div>
  );
}
