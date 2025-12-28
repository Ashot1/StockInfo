

# Setup Guide: Cursor + Codex + GitHub Projects + Archon

Этот гайд описывает, как с нуля настроить систему агентной разработки:
- Kanban в GitHub Projects
- Issues + Context Packs
- `AGENTS.md`
- Archon как база знаний
- Автоматизации статусов (PR → In Review, merge → Done)
- Минимальный "конвейер ролей": Planner → Workers → Reviewer

> Безопасность и enterprise-настройки вне scope: цель — быстрый запуск для pet‑проекта.

---

## 0) Предпосылки
Нужно:
- репозиторий на GitHub
- Cursor установлен и настроен на работу с репо
- доступ к Codex (Cloud/CLI)
- (опционально) доступ к OpenRouter для моделей

Рекомендация по структуре репозитория:
- `AI-workflow/` — документация процессов (эти файлы)
- `context/` — Context Packs
- `.github/` — templates, actions

---

## 1) Создать GitHub Project (Kanban)

### 1.1 Создай Project
В GitHub:
- открой вкладку **Projects** (на уровне org или repo)
- создай **New project**
- выбери шаблон “Board” (Kanban)

### 1.2 Настрой поле Status
Сделай поле `Status` (или используй существующее) и колонки:
- Backlog
- Ready
- In Progress
- In Review
- Blocked
- Done

### 1.3 Связь Issues ↔ Project
- добавляй Issues в Project
- включи удобные views:
  - Board (Kanban)
  - Table (список)

> Минимум: чтобы каждое Issue попадало на доску, и статусы менялись явно.

---

## 2) Добавить базовые папки и документы в репо

### 2.1 Создай папки
- `AI-workflow/`
- `context/`

### 2.2 Добавь документы процесса
Убедись, что в репо есть:
- `AI-workflow/Overview.md`
- `AI-workflow/Management-Process.md`
- `AI-workflow/Development_proccess.md`
- `AI-workflow/Roles.md`
- `AI-workflow/Setup_guide.md` (этот файл)

---

## 3) Создать `AGENTS.md` (обязательный)

Создай в корне репо файл `AGENTS.md`.

### 3.1 Минимальное содержимое `AGENTS.md`
Должно включать:
- правило “**каждый Task Issue имеет Context Pack**”
- правило “**PR открыт → In Review**, PR merged → **Done**”
- правило “**Reviewer обязателен**”
- DoD по умолчанию
- требования к тестам
- формат веток `issue-<id>-<slug>`
- шаблон PR (Summary/How to test/Risks)
- обязанность обновлять Context Pack

### 3.2 Зачем это нужно
Агенты (и люди) будут ссылаться на `AGENTS.md` как на “конституцию проекта”.

---

## 4) Настроить Context Pack workflow

### 4.1 Шаблон Context Pack
Создай шаблон, например:
- `context/_TEMPLATE.md`

Рекомендуемая структура:
- Goal
- Definition of Done
- Architecture / Decision
- Files / Entry points
- Test plan
- Risks / Debt
- Progress notes

### 4.2 Правило именования
- `context/ISSUE-<номер>-<slug>.md`

### 4.3 Правило связывания
В каждую Task Issue добавляй строку:
- `Context Pack: context/ISSUE-<n>-<slug>.md`

---

## 5) Добавить Issue templates (Epic / Task)

### 5.1 Папка templates
Создай:
- `.github/ISSUE_TEMPLATE/epic.yml`
- `.github/ISSUE_TEMPLATE/task.yml`

### 5.2 Epic template (суть)
Epic должен содержать:
- Goal / Why
- Scope / Non-goals
- Acceptance criteria (high-level)
- Constraints / Risks
- Plan (после декомпозиции): список task issues

### 5.3 Task template (суть)
Task должен содержать:
- Context
- Goal
- DoD (чеклист)
- Test plan
- Dependencies
- Context Pack link

---

## 6) Добавить PR template
Создай файл:
- `.github/PULL_REQUEST_TEMPLATE.md`

Он должен требовать:
- `Closes #<issue>`
- Summary
- How to test
- Risks/Notes
- чеклист (DoD выполнен, Context Pack обновлён)

---

## 7) Настроить Archon (Knowledge Base)

### 7.1 Быстрый запуск
Запусти Archon (самый простой путь — docker). Цель:
- получить UI
- создать workspace “Project KB”

### 7.2 Что индексировать
Минимум добавь в KB:
- `AGENTS.md`
- папку `context/`
- `docs/` (если есть)
- `AI-workflow/` (чтобы агенты могли находить процессы)

### 7.3 Режим обновления
Самый простой режим:
- вручную “re-ingest” после больших изменений

Лучше:
- GitHub Action, который на merge в `main` триггерит переиндексацию через API Archon.

> Главное: KB должна быть актуальной, иначе автономность падает.

---

## 8) Подключить GitHub к агентам (MCP)

### 8.1 В Cursor
Добавь GitHub MCP Server (как MCP tool/provider), чтобы агент мог:
- создавать и читать issues
- комментировать
- смотреть PR
- управлять статусами/полями (насколько позволяет MCP-инструмент)

> Это ключевой шаг, чтобы Planner/Reviewer могли работать “в трекере”, а не только в чате.

---

## 9) Настроить автоматизацию статусов (PR → In Review, merge → Done)

Цель: убрать ручное перетаскивание карточек.

### 9.1 Минимальная версия (без кода)
Пока не настроены Actions:
- Worker вручную переводит Issue в **In Review** при открытии PR
- Reviewer/Worker переводит в **Done** после merge

### 9.2 Версия с GitHub Actions (рекомендуется)
Добавь workflow, который на события:
- `pull_request` (opened, ready_for_review)
- `pull_request` (closed + merged)

Обновляет поле `Status` у связанного Issue/Project item.

> В реализации понадобится Projects API и токен с правами на projects.

---

## 10) Запуск конвейера ролей (как работать каждый день)

### 10.1 Создание Epic
Ты создаёшь Epic Issue (по шаблону), добавляешь в Project и ставишь **Backlog**.

### 10.2 Planner: декомпозиция
Запускаешь Planner (в Cursor):
- разбить Epic на 8–15 задач
- создать Task issues
- создать Context Packs (скелет)
- поставить метки и зависимости
- перевести задачи в **Ready**

### 10.3 Workers: параллельное выполнение
Запускаешь несколько Workers (Codex сессии):
- каждый берёт одну задачу из Ready
- переводит в In Progress
- делает PR
- обновляет Context Pack

### 10.4 Reviewer: обязательный этап
Reviewer (ты или агент):
- проверяет PR по `AGENTS.md` и DoD
- approve/request changes

После merge:
- статус → Done

---

## 11) Минимальный чеклист “система работает”

- [ ] Есть GitHub Project board и статусы
- [ ] Есть `AGENTS.md`
- [ ] Есть `context/` и шаблон `_TEMPLATE.md`
- [ ] Есть issue templates (epic/task)
- [ ] Есть PR template
- [ ] Archon индексирует `context/` и `AGENTS.md`
- [ ] Работает правило статусов PR→In Review / merge→Done
- [ ] Есть процесс: Planner → Workers → Reviewer

---

## Что дальше улучшить (опционально)
- Добавить минимальный CI (lint/test) если ещё нет
- Добавить автоматический re-ingest Archon на merge
- Добавить "Definition of Ready" для задач (что должно быть, чтобы попасть в Ready)
- Добавить label-политику и WIP-лимиты
- Добавить “Reviewer gate” на `main`

---

## Приложение: быстрые промпты для ролей

### Planner prompt (в Cursor)
“Прими Epic #<id>. Разбей на 8–15 задач. Для каждой задачи:
- создай Issue
- заполни Goal/DoD/Test plan/Dependencies
- создай Context Pack файл по шаблону
- добавь ссылку на Context Pack в Issue
- расставь labels
- переведи задачу в Ready.
Отметь параллельные группы.”

### Worker prompt (в Codex)
“Возьми Issue #<id>. Прочитай Issue и Context Pack. Реализуй DoD.
Обнови Context Pack (решение/файлы/как проверить/риски). Открой PR с `Closes #<id>`.
Убедись, что тест-план выполнен или описан.”

### Reviewer prompt (в Cursor)
“Проведи ревью PR #<id>. Сверь с Issue и Context Pack, проверь DoD и test plan.
Оставь комментарии и чеклист. Если всё ок — approve. Если нет — request changes и верни задачу в In Progress.”