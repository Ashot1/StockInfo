
# Roles & Responsibilities (Planner / Worker / Reviewer)

Этот документ описывает роли в агентной системе разработки с использованием Archon MCP, их обязанности, входы/выходы, а также что должно быть в проекте, чтобы роли работали автономно.

Связанные документы:
- `AGENTS.md` (главный документ)
- `AI-workflow/Overview.md`
- `AI-workflow/Management-Process.md`
- `AI-workflow/Development_proccess.md`

---

## Общая схема

### Роли
- **Planner** — декомпозиция Epic → задачи в Archon, подготовка документации.
- **Worker (N)** — реализация конкретной задачи → PR.
- **Reviewer** — ревью PR по правилам проекта → approve/request changes.

### Контракты между ролями
- **Task (Archon)** — контракт "что сделать" (Goal/DoD/Test plan/Dependencies).
- **Archon Document** — контракт "как и почему" (решение/файлы/тесты/риски).
- **PR** — контракт "что изменено" (summary/how to test/риски/чеклист).

---

## Обязательные артефакты

### 1) `AGENTS.md` (в корне)
Единый набор правил, который обязаны читать все агенты.
Должно включать:
- Definition of Done (общий)
- стиль кода / форматирование
- требования к тестам
- формат PR (шаблон/чеклист)
- правило: **каждая Task имеет Archon Document**
- правило: **PR открыт → review**, PR merged → **done**
- правило: **Reviewer обязателен**

> `AGENTS.md` — главный источник истины для поведения агентов.

### 2) Archon MCP Server
- Хранение всех Projects и Tasks
- Документация в виде Archon Documents
- Статусы задач (todo/doing/review/done/blocked)

### 3) CI (минимальный)
- хотя бы быстрый `lint`/`test` или smoke
- цель: Reviewer мог доверять проверкам

### 4) PR template (желательно)
- `.github/PULL_REQUEST_TEMPLATE.md`

---

## Role: Planner

### Цель
Превратить неструктурированную "большую идею" в план работ в Archon, который:
- можно выполнять параллельно
- не требует постоянных уточнений от тебя
- гарантирует, что Worker-агенты не потеряют контекст

### Вход
- Epic (описание большой задачи)
- текущее состояние репозитория
- ограничения (дедлайны/технологии/не делать X)

### Выход
- Project в Archon (для Epic)
- 8–15 Tasks в Archon (обычно)
- каждая Task в статусе **todo**
- у каждой Task:
  - DoD
  - тест-план
  - dependencies
  - созданный Archon Document

### Обязанности (чеклист)
- [ ] Уточнить цель и границы (scope / non-goals)
- [ ] Создать/найти Project в Archon
- [ ] Разбить Epic на 8–15 задач
- [ ] Пометить зависимости (что блокирует что)
- [ ] Отметить параллельные группы (что можно делать одновременно)
- [ ] Создать Archon Document на каждую задачу
- [ ] Проставить task_order (приоритеты)
- [ ] Установить статус **todo**

### Правила декомпозиции
- Task должен вести к одному PR
- Если Task звучит как "сделать полпроекта" — дробить дальше
- Обязательная проверяемость: у каждой задачи есть тест-план

### Что Planner НЕ делает
- не пишет код (если только это не "плановый" PR с шаблонами/доками)
- не закрывает задачи без PR

### Рекомендуемые инструменты
- Cursor (Agent mode) как рабочее место
- Archon MCP tools для создания Projects, Tasks, Documents

---

## Role: Worker (Codex / Cursor)

### Цель
Взять одну Task из Archon и довести её до PR, который можно смёрджить после ревью.

### Вход
- Task в статусе **todo** (из Archon)
- Archon Document (связанный с Task)

### Выход
- PR, связанный с Task (`Closes Task #<id>`)
- обновлённый Archon Document
- задача в статусе **review**

### Обязанности (чеклист)
### Обязанности (чеклист)
- [ ] Получить Task из Archon (`find_tasks`)
- [ ] Получить Archon Document (`find_documents`)
- [ ] Если есть неясность — уточнить и обновить Task description/Document
- [ ] Начать работу (`manage_task("update", status="doing")`)
- [ ] Реализовать DoD
- [ ] Выполнить тест-план (или описать ручную проверку)
- [ ] Обновить Archon Document:
  - progress_notes (по ходу работы)
  - implementation_summary (перед PR)
  - изменённые файлы/точки входа
  - команды/шаги проверки
  - риски/долги
- [ ] Открыть PR:
  - `Closes Task #<id>`
  - Summary/How to test/Risks
- [ ] Перевести задачу в **review** (`manage_task("update", status="review")`)

### Правила работы параллельных Workers
- Один Worker = одна задача
- В "doing" у одного исполнителя максимум 1–2 задачи
- Если задача блокируется — перевести в **blocked** и описать причину

### Рекомендуемый режим для Codex
- Запускать Codex "на одну задачу"
- Запрещено: смешивать несколько tasks в одной сессии без явного плана

---

## Role: Reviewer

### Цель
Обеспечить качество и предсказуемость мерджа: соответствие DoD, тест-плану и правилам проекта.

### Вход
- PR в статусе **review**
- связанный Task (из Archon)
- Archon Document
- `AGENTS.md`

### Выход
- Approve (и PR можно мерджить)
- или Request changes (с конкретными правками)
- актуализированный статус задачи (doing / done в Archon)

### Обязанности (чеклист)
- [ ] Проверить связь PR ↔ Task
- [ ] Получить Task и Document из Archon
- [ ] Сверить PR с Goal/DoD
- [ ] Проверить тесты/как проверить
- [ ] Проверить читаемость и поддержку (структура, naming)
- [ ] Проверить edge-cases/ошибки
- [ ] Проверить, что Archon Document обновлён итогом
- [ ] Обновить статус в Archon:
  - `manage_task("update", status="done")` при approve
  - `manage_task("update", status="doing")` при request changes

### Политика ревью
- Замечания должны быть:
  - конкретные
  - проверяемые
  - с предложением исправления
- Если PR большой и тяжело ревьюить — просить дробление

### Reviewer-агент (если используется)
Reviewer-агент **не пишет код**, его задача — оставить комментарии и чеклисты.
Исправления делает Worker.

---

## Автоматизация, которая поддерживает роли

### 1) Planner → creates tasks (обязательный сценарий)
Поведение системы:
- Ты даёшь **Epic** (описание)
- Planner создаёт **Project в Archon**
- Planner создаёт **8–15 Tasks в Archon**
- Planner проставляет DoD, зависимости и параллельность
- Planner создаёт Archon Documents

### 2) Управление статусами через Archon
Все статусы управляются через Archon MCP:
```bash
# Worker начинает
manage_task("update", task_id="...", status="doing")

# Worker отправляет на ревью
manage_task("update", task_id="...", status="review")

# Reviewer одобряет
manage_task("update", task_id="...", status="done")
```

### 3) Обязательный reviewer gate
Рекомендация:
- защищённая ветка `main`
- требование хотя бы одного approve

---

## Минимальные "права и доступы"

### Для Planner
- создавать Projects и Tasks в Archon
- создавать Archon Documents
- устанавливать task_order и dependencies

### Для Worker
- создавать ветки/PR
- пушить код
- обновлять Archon Documents
- изменять статусы Tasks в Archon

### Для Reviewer
- оставлять review-комментарии в PR
- approve/request changes
- изменять статусы Tasks в Archon
- (опционально) мерджить

---

## Готовность к запуску (definition of ready для системы)
Система считается готовой, когда:
- [ ] есть Archon MCP server (настроен и доступен)
- [ ] есть `AGENTS.md` с правилами
- [ ] есть PR template
- [ ] есть минимальный CI
- [ ] описан процесс (этот документ + management + dev process)
