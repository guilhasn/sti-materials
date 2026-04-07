# Das Relações às Tabelas

## Objectivos

- [ ] Compreender o que é um pressuposto e como influencia o modelo.
- [ ] Distinguir participação obrigatória de participação não obrigatória.
- [ ] Decidir, por intuição e por experimentação com dados reais, onde colocar as chaves estrangeiras.
- [ ] Escrever o esquema relacional final com PKs e FKs.

---

## Conceitos-chave

| Conceito | Significado | Exemplo |
|----------|------------|---------|
| **Pressuposto** | Frase que descreve uma regra de funcionamento da organização | "Cada evento realiza-se num único espaço" |
| **Participação obrigatória** | Todos os registos da entidade participam na relação | Todo evento tem obrigatoriamente um espaço |
| **Participação não obrigatória** | Nem todos os registos participam na relação | Nem todo artista está associado a um evento |
| **Chave estrangeira (FK)** | Atributo que referencia a PK de outra tabela | `codEspaco` dentro de Evento |
| **Tabela associativa** | Tabela extra que nasce para representar uma relação M:N | Actuação, Patrocínio |

---

## O que é um pressuposto?

!!! info "Definição"
    Um pressuposto é uma **frase que descreve como as coisas funcionam na organização**. Não é uma opinião — é uma regra de negócio confirmada com quem trabalha no terreno.

    **Exemplo 1:**
    "Cada evento realiza-se num único espaço, mas um espaço pode acolher vários eventos."
    → Cardinalidade **1:N** (Espaço → Evento). Participação **obrigatória** no Evento (todo evento tem espaço).

    **Exemplo 2:**
    "Um artista pode não estar associado a nenhum evento neste momento."
    → Participação **não obrigatória** no lado do Artista.

    Os pressupostos determinam **cardinalidade** e **participação** — e estes vão guiar-nos na decisão sobre onde colocar as chaves estrangeiras.

---

## Cenário — Continuação de Vila Feliz

!!! abstract "Contexto"
    No capítulo anterior identificámos 4 entidades (Evento, Espaço, Artista, Patrocinador), definimos os seus atributos e desenhámos o diagrama E-R no ERDPlus. Agora vamos transformar esse diagrama em **tabelas organizadas**, prontas para uma base de dados.

    Em vez de decorar "regras de conversão", vamos seguir uma abordagem intuitiva: desenhar as tabelas com **dados reais**, **tentar** colocar a FK no sítio mais natural e **verificar** se aparecem células vazias ou linhas repetidas. Os nomes das regras vêm depois — são apenas etiquetas para algo que já percebemos.

---

## Tarefa 1 — Definir pressupostos

Lembram-se de quando perguntámos "quantos espaços tem um evento?" — essa resposta é o pressuposto. Agora formalizamos:

| Relação | Pressuposto | Cardinalidade | Participação | Porquê |
|---------|------------|---------------|--------------|--------|
| Evento ↔ Espaço | Cada evento realiza-se num único espaço; cada espaço pode acolher vários eventos ao longo do ano. | **1:N** | **Obrigatória** no Evento (todo evento tem espaço) | Não faz sentido criar um evento sem lhe atribuir um local. |
| Evento ↔ Artista | Cada evento pode ter vários artistas; cada artista pode actuar em vários eventos. | **M:N** | **Não obrigatória** em ambos os lados | Um evento pode ainda não ter artistas confirmados; um artista pode não ter eventos marcados. |
| Evento ↔ Patrocinador | Cada evento pode ter vários patrocinadores; cada patrocinador pode patrocinar vários eventos. | **M:N** | **Não obrigatória** em ambos os lados | Um evento pode não ter patrocinadores; um patrocinador pode não estar activo este ano. |

!!! warning "Cuidado com os pressupostos"
    Um pressuposto errado gera um modelo errado. Se assumirmos que cada evento só tem um espaço mas na realidade o Festival de Chocolate usa 5 espaços diferentes, o modelo não funcionará. Confirmar sempre com quem conhece a organização.

---

## Tarefa 2 — Converter por intuição (não por receita)

Para cada relação vamos fazer sempre o mesmo exercício:

1. Olhar para o pressuposto.
2. **Tentar** meter a FK no lado mais natural.
3. Desenhar **3 ou 4 linhas** com dados reais de Vila Feliz.
4. Perguntar: **há células vazias? há linhas repetidas?**
5. Decidir: fica assim ou precisamos de uma tabela extra?

### Evento ↔ Espaço

**Pressuposto:** cada evento tem um único espaço; um espaço acolhe vários eventos (1:N, obrigatória no Evento).

**Tentativa:** como cada evento tem *apenas um* espaço, parece natural guardar o `codEspaco` directamente dentro da linha do Evento. Vamos experimentar:

**Tabela Evento (tentativa)**

| codEvento | nome | dataInicio | codEspaco |
|-----------|------|------------|-----------|
| E01 | Festival Chocolate | 2026-03-14 | ESP02 |
| E02 | Mercado Medieval | 2026-05-20 | ESP01 |
| E03 | Natal Vila Feliz | 2026-12-10 | ESP03 |

**Tabela Espaco**

| codEspaco | nome | localizacao |
|-----------|------|-------------|
| ESP01 | Praça do Município | Centro |
| ESP02 | Parque da Cerca | Zona Sul |
| ESP03 | Pavilhão Municipal | Zona Norte |

Agora perguntamos:

- **Há células vazias?** Não. Todos os eventos têm um espaço preenchido (participação obrigatória).
- **Há linhas repetidas?** Não. Cada evento aparece uma única vez.

Resultado: **ficamos com estas duas tabelas**, tal como estão. Não precisamos de nada extra.

!!! tip "Nota"
    Isto que acabámos de fazer — colocar a PK do lado "1" como FK no lado "N" — é exactamente aquilo a que os livros chamam **Regra 4**. Mas não precisámos de decorar a regra: percebemos, com dados, que era a solução natural.

```
Evento(codEvento, nome, dataInicio, dataFim, edicao, orcamento, codEspaco)
                                                                 ↑ FK → Espaco
```

---

### Evento ↔ Artista

**Pressuposto:** cada evento pode ter *vários* artistas; cada artista pode actuar em *vários* eventos (M:N).

**Tentativa:** por analogia com o caso anterior, alguém poderia sugerir "meter um `codArtista` dentro do Evento". Vamos experimentar com dados reais. Sabemos que o Festival de Chocolate tem 3 artistas confirmados: a Banda Filarmónica, o grupo Doces Vozes e o DJ Cacau.

**Tabela Evento (tentativa falhada)**

| codEvento | nome | dataInicio | codArtista |
|-----------|------|------------|------------|
| E01 | Festival Chocolate | 2026-03-14 | A01 |
| E01 | Festival Chocolate | 2026-03-14 | A02 |
| E01 | Festival Chocolate | 2026-03-14 | A03 |
| E02 | Mercado Medieval | 2026-05-20 | A04 |

Perguntamos:

- **Há linhas repetidas?** **Sim!** O Festival de Chocolate aparece 3 vezes. O nome, a data, a edição, o orçamento — tudo duplicado três vezes, só para conseguir listar os três artistas. ❌
- E se o Festival tiver 10 artistas? 10 linhas iguais, a desperdiçar espaço e a arriscar inconsistências (basta alguém corrigir a data numa linha e esquecer-se das outras).

A tentativa falha. A outra opção seria meter `codEvento` dentro de Artista — mas aí seria o artista a repetir-se (o DJ Cacau actuaria em 5 eventos → 5 linhas iguais do DJ). Também falha.

**Solução:** criamos uma **terceira tabela**, uma espécie de "folha de presenças", em que cada linha liga um evento a um artista.

**Tabela Actuação**

| codEvento | codArtista | cache | dataActuacao |
|-----------|------------|-------|--------------|
| E01 | A01 | 500 | 2026-03-14 |
| E01 | A02 | 350 | 2026-03-14 |
| E01 | A03 | 800 | 2026-03-15 |
| E02 | A04 | 600 | 2026-05-20 |

Agora cada Evento aparece uma única vez na tabela Evento, cada Artista aparece uma única vez na tabela Artista, e as **ligações** vivem na tabela Actuação. Sem repetições. ✅

!!! tip "Nota"
    Isto que acabámos de fazer — criar uma tabela associativa para representar uma relação de muitos-para-muitos — é aquilo a que se chama **Regra 6**. A tabela chamamos-lhe **Actuação** porque é isso que representa: um artista a actuar num evento.

```
Actuação(codEvento, codArtista, cache, dataActuacao)
          ↑ FK → Evento  ↑ FK → Artista
          └──── PK composta ────┘
```

---

### Evento ↔ Patrocinador

**Pressuposto:** cada evento pode ter *vários* patrocinadores; cada patrocinador pode apoiar *vários* eventos (M:N).

**Tentativa:** mesma história. Se tentarmos meter `codPatrocinador` dentro de Evento, o Festival de Chocolate (com 2 patrocinadores — Pastelaria Doce Lar e Banco Local) obriga-nos a duplicar a linha:

**Tabela Evento (tentativa falhada)**

| codEvento | nome | codPatrocinador |
|-----------|------|-----------------|
| E01 | Festival Chocolate | P01 |
| E01 | Festival Chocolate | P02 |
| E03 | Natal Vila Feliz | P01 |

- **Há linhas repetidas?** Sim, outra vez. ❌

Aplicamos a mesma ideia de antes: uma tabela à parte para as ligações. Chamamos-lhe **Patrocínio** porque é isso que cada linha representa — um acto de patrocínio, com o seu valor e a sua contrapartida.

**Tabela Patrocínio**

| codEvento | codPatrocinador | valor | tipo |
|-----------|-----------------|-------|------|
| E01 | P01 | 2000 | Monetário |
| E01 | P02 | 1500 | Espécie |
| E03 | P01 | 3000 | Monetário |

Cada linha é única, cada patrocinador é registado uma única vez na tabela Patrocinador, cada evento uma única vez em Evento. ✅

!!! tip "Nota"
    Outra vez **Regra 6** — M:N resolve-se com tabela associativa. Já não é surpresa: sempre que ambos os lados podem ter "muitos", nasce uma tabela extra no meio.

```
Patrocínio(codEvento, codPatrocinador, valor, tipo)
            ↑ FK → Evento  ↑ FK → Patrocinador
            └──── PK composta ──────┘
```

---

!!! note "A intuição por trás das duas decisões"
    - Se um lado só pode ter **um** → a FK cabe directamente dentro dele, sem duplicar nada.
    - Se **ambos** os lados podem ter **muitos** → nenhum dos lados aguenta a FK sem duplicar linhas, e nasce uma tabela associativa.

    As "regras" dos livros são apenas nomes para estas duas observações. Quem percebe a intuição nunca mais precisa de decorar.

---

## Tarefa 3 — Esquema relacional final

Reunindo todas as tabelas:

```
Evento(codEvento, nome, dataInicio, dataFim, edicao, orcamento, codEspaco)
       PK                                                       FK → Espaco

Espaco(codEspaco, nome, localizacao, tipo, lotacao)
       PK

Artista(codArtista, nome, tipo, contacto, email)
        PK

Patrocinador(codPatrocinador, nome, NIF, contacto, email)
              PK

Actuação(codEvento, codArtista, cache, dataActuacao)
         PK/FK      PK/FK

Patrocínio(codEvento, codPatrocinador, valor, tipo)
            PK/FK     PK/FK
```

Total: **6 tabelas** — 4 entidades + 2 tabelas associativas.

---

## Tarefa 4 — Antes e depois

| Aspecto | Antes (Excel) | Depois (Modelo E-R → Tabelas) |
|---------|--------------|-------------------------------|
| Dados do artista | Copiados em cada linha do evento | Entidade Artista separada, referenciada por FK |
| Dados do patrocinador | Misturados com o evento | Tabela Patrocínio com FKs para ambos os lados |
| Chave única | Inexistente | Cada entidade tem PK; tabelas associativas têm PK composta |
| Total investido por patrocinador | Soma manual, com risco de duplicados | Consulta simples à tabela Patrocínio |
| Estrutura | Uma folha com tudo misturado | 6 tabelas normalizadas, cada uma com finalidade clara |

**Cada dado é guardado uma vez, no sítio correcto.** O nome do artista aparece apenas na tabela Artista. Se o contacto mudar, actualiza-se num único local — e todas as referências ficam automaticamente correctas.

---

!!! tip "Próximo passo"
    No próximo capítulo vamos validar este modelo — procurar erros, escolher as melhores chaves primárias, definir domínios dos atributos e preparar a especificação final.
