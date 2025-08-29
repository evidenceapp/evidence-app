export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-[#D1B046]">Política de Privacidade</h1>

      <p className="mb-4 text-gray-700">
        A sua privacidade é importante para nós. Esta Política de Privacidade descreve como o{" "}
        <strong>Evidence Instituto Clínico</strong> coleta, utiliza e protege as informações
        fornecidas ao utilizar nossa plataforma.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Quem Utiliza o Login</h2>
      <p className="mb-4 text-gray-700">
        O login na plataforma é destinado **exclusivamente para fisioterapeutas credenciados** do
        <strong> Evidence Instituto Clínico</strong>. Nenhum paciente ou visitante precisa criar
        conta ou realizar login para acessar conteúdos públicos.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Informações que Coletamos</h2>
      <p className="mb-4 text-gray-700">
        Quando os fisioterapeutas utilizam o login via Instagram, coletamos **apenas** as seguintes
        informações, com consentimento prévio:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>
          O nome de usuário do Instagram (<strong>@</strong>);
        </li>
        <li>A foto de perfil pública do Instagram.</li>
      </ul>
      <p className="mb-4 text-gray-700">
        Nenhuma outra informação, como e-mail, lista de seguidores ou mensagens privadas, é coletada
        ou armazenada pela plataforma.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Dados do Formulário de Contato</h2>
      <p className="mb-4 text-gray-700">
        Caso você utilize o formulário de contato na página principal, os dados fornecidos serão
        utilizados **exclusivamente para métricas internas**, com o objetivo de melhorar a qualidade
        do nosso atendimento. **Não comercializamos, vendemos ou compartilhamos** essas informações.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Como Utilizamos os Dados</h2>
      <p className="mb-4 text-gray-700">Os dados coletados são utilizados para:</p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Identificar fisioterapeutas credenciados na plataforma.</li>
        <li>Exibir corretamente o nome de usuário e a foto de perfil do Instagram.</li>
        <li>Melhorar a qualidade do atendimento com base nas métricas internas do formulário.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Compartilhamento de Dados</h2>
      <p className="mb-4 text-gray-700">
        Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para
        cumprir obrigações legais. O login via Instagram utiliza a integração oficial fornecida pela
        Meta, e os dados acessados respeitam as permissões autorizadas por você.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Segurança das Informações</h2>
      <p className="mb-4 text-gray-700">
        Adotamos medidas técnicas e administrativas adequadas para proteger os dados coletados
        contra acessos não autorizados, alteração, divulgação ou destruição.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Direitos do Usuário (LGPD)</h2>
      <p className="mb-4 text-gray-700">
        Em conformidade com a Lei Geral de Proteção de Dados (LGPD), os fisioterapeutas e usuários
        do formulário de contato têm o direito de:
      </p>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Acessar as informações que possuímos sobre você.</li>
        <li>Solicitar a correção ou exclusão dos seus dados.</li>
        <li>Revogar o consentimento para uso dos seus dados a qualquer momento.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Alterações na Política</h2>
      <p className="mb-4 text-gray-700">
        Esta política pode ser atualizada periodicamente. Sempre que houver alterações, publicaremos
        uma nova versão nesta página.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contato</h2>
      <p className="mb-4 text-gray-700">
        Em caso de dúvidas ou solicitações relacionadas a esta Política de Privacidade, você pode
        entrar em contato conosco através do e-mail:{" "}
        <a href="mailto:evidenceinstitutoapp@gmail.com" className="text-[#D1B046] underline">
          evidenceinstitutoapp@gmail.com
        </a>
      </p>

      <p className="mt-6 text-sm text-gray-500">
        Última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
}
