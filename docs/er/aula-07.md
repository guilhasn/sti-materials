# Das Relações às Tabelas

## Objectivos

- [ ] Compreender o que é um pressuposto e como influencia o modelo.
- [ ] Distinguir participação obrigatória de participação não obrigatória.
- [ ] Aplicar as regras de conversão (Regra 4 e Regra 6) ao cenário de Vila Feliz.
- [ ] Escrever o esquema relacional final com PKs e FKs.

---

## Conceitos-chave

| Conceito | Significado | Exemplo |
|----------|------------|---------|
| **Pressuposto** | Frase que descreve uma regra de funcionamento da organização | "Cada evento realiza-se num único espaço" |
| **Participação obrigatória** | Todos os registos da entidade participam na relação | Todo evento tem obrigatoriamente um espaço |
| **Participação não obrigatória** | Nem todos os registos participam na relação | Nem todo artista está associado a um evento |
| **Regra de conversão** | Regra que transforma uma relação do DER em tabelas | Regra 4 (1:N), Regra 6 (M:N) |
| **Esquema relacional** | Conjunto final de tabelas com PKs e FKs | Evento(codEvento, nome, ..., codEspaco) |

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

    Os pressupostos determinam **cardinalidade** e **participação** — e estes determinam **qual regra de conversão aplicar**.

---

## Cenário — Continuação de Vila Feliz

!!! abstract "Contexto"
    Na Aula 06 identificámos 4 entidades (Evento, Espaço, Artista, Patrocinador), definimos os seus atributos e desenhámos o diagrama E-R no ERDPlus. Agora vamos transformar esse diagrama em **tabelas organizadas**, prontas para uma base de dados.

---

## Tarefa 1 — Definir pressupostos

Lembram-se da Aula 06, quando perguntámos "quantos espaços tem um evento?" — essa resposta é o pressuposto. Agora formalizamos:

| Relação | Pressuposto | Cardinalidade | Participação | Porquê |
|---------|------------|---------------|--------------|--------|
| Evento ↔ Espaço | Cada evento realiza-se num único espaço; cada espaço pode acolher vários eventos ao longo do ano. | **1:N** | **Obrigatória** no Evento (todo evento tem espaço) | Não faz sentido criar um evento sem lhe atribuir um local. |
| Evento ↔ Artista | Cada evento pode ter vários artistas; cada artista pode actuar em vários eventos. | **M:N** | **Não obrigatória** em ambos os lados | Um evento pode ainda não ter artistas confirmados; um artista pode não ter eventos marcados. |
| Evento ↔ Patrocinador | Cada evento pode ter vários patrocinadores; cada patrocinador pode patrocinar vários eventos. | **M:N** | **Não obrigatória** em ambos os lados | Um evento pode não ter patrocinadores; um patrocinador pode não estar activo este ano. |

!!! warning "Cuidado com os pressupostos"
    Um pressuposto errado gera um modelo errado. Se assumirmos que cada evento só tem um espaço mas na realidade o Festival de Chocolate usa 5 espaços diferentes, o modelo não funcionará. Confirmar sempre com quem conhece a organização.

---

## Tarefa 2 — Aplicar regras de conversão

Agora, para cada relação, indicamos a regra e explicamos **porquê**.

### Evento ↔ Espaço — Regra 4 (1:N com participação obrigatória no lado N)

**Porquê Regra 4?** Porque a cardinalidade é 1:N e o lado "muitos" (Evento) tem participação obrigatória — todo evento tem um espaço. A regra manda colocar a chave primária do lado "1" (Espaço) como **chave estrangeira** no lado "N" (Evento).

**Resultado:** A tabela Evento recebe o atributo `codEspaco` como FK.

```
Evento(codEvento, nome, dataInicio, dataFim, edicao, orcamento, codEspaco)
                                                                 ↑ FK → Espaço
```

### Evento ↔ Artista — Regra 6 (M:N)

**Porquê Regra 6?** Porque a cardinalidade é M:N — vários para vários. A regra manda criar uma **tabela associativa** cuja chave primária é composta pelas PKs das duas entidades. Esta tabela pode ter atributos próprios (cachê, data de actuação).

**Resultado:** Nasce a tabela **Actuação**.

```
Actuação(codEvento, codArtista, cachê, dataActuação)
          ↑ FK → Evento  ↑ FK → Artista
          └──── PK composta ────┘
```

### Evento ↔ Patrocinador — Regra 6 (M:N)

**Porquê Regra 6?** Pela mesma razão: M:N. Criamos uma tabela associativa com atributos próprios (valor do patrocínio, tipo de contrapartida).

**Resultado:** Nasce a tabela **Patrocínio**.

```
Patrocínio(codEvento, codPatrocinador, valor, tipo)
            ↑ FK → Evento  ↑ FK → Patrocinador
            └──── PK composta ──────┘
```

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

Actuação(codEvento, codArtista, cachê, dataActuação)
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
    Na **Aula 08** vamos validar este modelo — procurar erros, escolher as melhores chaves primárias, definir domínios dos atributos e preparar a especificação final.
