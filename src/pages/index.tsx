import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const moduleCards = [
  {
    title: 'Aula 1',
    subtitle: 'Tabelas Dinamicas e Agregacoes',
    href: '/docs/excel/aula-01-tabelas-dinamicas',
    points: 'CONTAR, SOMA, MEDIA, MAXIMO e MINIMO em dados de atendimento municipal.',
  },
  {
    title: 'Aula 2',
    subtitle: 'Funcoes Condicionais Basicas',
    href: '/docs/excel/aula-02-funcoes-basicas',
    points: 'CONTAR.SE, SOMA.SE e SE aplicadas ao mapa de pessoal.',
  },
  {
    title: 'Aula 3',
    subtitle: 'Caso Integrador',
    href: '/docs/excel/aula-03-caso-integrador',
    points: 'Analise completa para apoiar decisao em contexto publico.',
  },
];

export default function Home(): React.ReactElement {
  return (
    <Layout
      title="STI | Excel para Decisao Publica"
      description="Materiais da UC Sistemas e Tecnologias de Informacao - MAP"
    >
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.kicker}>Mestrado em Administracao Publica</p>
          <h1>Excel para Decisao Publica</h1>
          <p>
            Bloco inicial da UC de Sistemas e Tecnologias de Informacao com foco em
            analise de dados para apoio a gestao municipal.
          </p>
          <div className={styles.heroActions}>
            <Link className="button button--primary button--lg" to="/docs/excel">
              Entrar no Modulo
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/excel/aula-01-tabelas-dinamicas">
              Comecar na Aula 1
            </Link>
          </div>
        </section>

        <section className={styles.gridSection}>
          {moduleCards.map((card) => (
            <article key={card.title} className={styles.card}>
              <p className={styles.cardLabel}>{card.title}</p>
              <h2>{card.subtitle}</h2>
              <p>{card.points}</p>
              <Link className={styles.cardLink} to={card.href}>
                Ver conteudo
              </Link>
            </article>
          ))}
        </section>

        <section className={styles.infoStrip}>
          <div>
            <h3>Formato dos materiais</h3>
            <p>Cada aula inclui dataset, ficha de trabalho e resolucao docente.</p>
          </div>
          <div>
            <h3>Aplicacao real</h3>
            <p>Exercicios orientados a problemas concretos da Administracao Publica.</p>
          </div>
          <div>
            <h3>Progressao</h3>
            <p>Do basico ao integrador em 3 aulas sequenciais e avaliaveis.</p>
          </div>
        </section>
      </main>
    </Layout>
  );
}
