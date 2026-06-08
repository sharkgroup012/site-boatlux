import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | BOATLUX®",
};

export default function PoliticaPage() {
  return (
    <section className="pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-cream-100 mb-8">
          Política de Privacidade
        </h1>
        <div className="prose prose-invert max-w-none space-y-6 text-cream-400 leading-relaxed">
          <p>
            A BOATLUX® respeita a privacidade de seus usuários e está comprometida
            com a proteção dos dados pessoais coletados em nosso site, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº
            13.709/2018).
          </p>
          <h2 className="font-display text-2xl font-semibold text-cream-100 mt-8">
            Dados coletados
          </h2>
          <p>
            Coletamos apenas os dados fornecidos voluntariamente por você através
            de formulários de contato: nome, telefone, e-mail e mensagem. Esses
            dados são utilizados exclusivamente para contato comercial relacionado
            às cotas náuticas BOATLUX®.
          </p>
          <h2 className="font-display text-2xl font-semibold text-cream-100 mt-8">
            Uso dos dados
          </h2>
          <p>
            Seus dados são utilizados para: responder às suas solicitações de
            contato, enviar informações sobre produtos e serviços de seu interesse,
            e melhorar nosso atendimento.
          </p>
          <h2 className="font-display text-2xl font-semibold text-cream-100 mt-8">
            Compartilhamento
          </h2>
          <p>
            Não vendemos, alugamos ou compartilhamos seus dados pessoais com
            terceiros para fins comerciais.
          </p>
          <h2 className="font-display text-2xl font-semibold text-cream-100 mt-8">
            Seus direitos
          </h2>
          <p>
            Você pode, a qualquer momento, solicitar acesso, correção ou exclusão
            dos seus dados pessoais entrando em contato pelo e-mail:{" "}
            <a
              href="mailto:comercial@boatluxsp.com.br"
              className="text-gold-500 hover:text-gold-400"
            >
              comercial@boatluxsp.com.br
            </a>
          </p>
          <p className="text-cream-500 text-sm mt-8">
            Última atualização: Junho de 2025.
          </p>
        </div>
      </div>
    </section>
  );
}
