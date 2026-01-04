# Management Process (Archon MCP)

## Зачем этот документ
Этот документ описывает **как мы управляем работой**:
- как устроено управление задачами в Archon MCP
- как заводить Projects и Tasks
- что обязательно должно быть в каждой задаче
- как связываем задачи с **Archon Documents** (долгоживущая память)
- как агенты двигают работу по статусам

---

## Управление через Archon MCP

### Основные сущности
1. **Projects** — проекты (Epic-уровень или группы задач)
2. **Tasks** — задачи внутри проектов
3. **Documents** — документация задач и проектов

### Статусы задач
Все задачи в Archon используют следующие статусы:
1. **todo** — задача готова к работе
2. **doing** — выполняется (есть владелец/агент)
3. **review** — открыт PR, идёт ревью (обязательная стадия)
4. **done** — смёрджено, критерии выполнены
5. **blocked** — заблокировано зависимостью/решением/внешним фактором

### WIP-лимиты (чтобы не расползалось)
- На одного исполнителя (человек или агент) — **не более 1–2 задач в doing**.
- Если больше — сначала довести текущую до PR/Review.

### Источник правды
- **Archon Tasks** — источник правды по статусам и задачам.
- **Archon Documents** — источник правды по требованиям и решениям.

---

## Типы задач: Project vs Task

### Project (Epic-уровень)
Project в Archon — это группа связанных задач, описывающая крупную цель/фичу:
- общую цель
- границы (scope / non-goals)
- список задач (Tasks) + зависимости/параллельность
- документацию (опционально, через Archon Documents)

Создание Project:
```bash
project = manage_project("create",
  title="EPIC: User Authentication System",
  description="Complete authentication flow with OAuth and email/password",
  github_repo="https://github.com/org/repo"
)
```

Project НЕ закрывается одним PR. Project закрывается, когда закрыты все Tasks.

### Task (единица работы)
Task в Archon — это задача, которая:
- имеет 1 владельца (worker-агент или ты)
- приводит к 1 PR (обычно)
- имеет **обязательный Archon Document**
- имеет чёткий DoD (Definition of Done)

Создание Task:
```bash
task = manage_task("create",
  project_id=project.id,
  title="Setup Supabase auth providers",
  description="Configure OAuth and email/password authentication",
  status="todo",
  task_order=10,  # higher = more priority
  assignee="Worker Agent"
)
```

---

## Обязательное правило: Archon Document на каждую задачу

### Что это
**Archon Document** — документ в Archon MCP, связанный с Task.
Он нужен для:
- долговременной памяти задачи
- стабильной автономности агентов
- предсказуемого ревью (DoD + тест-план)

### Где хранить
Документы хранятся в **Archon MCP server**, не в локальных файлах.

### Создание документа для задачи
```bash
# После создания задачи
doc = manage_document("create",
  project_id=task.project_id,
  title=f"Issue #{task.id}: Setup Supabase auth",
  document_type="spec",
  content={
    "goal": "Configure authentication providers in Supabase",
    "definition_of_done": [
      "OAuth providers configured",
      "Email/password auth enabled",
      "Test users created"
    ],
    "architecture": "Use Supabase Auth with multiple providers",
    "files_affected": ["src/utils/supabase/client.ts", "src/actions/Account/Auth.ts"],
    "test_plan": {
      "manual_steps": ["Open login page", "Test OAuth flow", "Test email login"],
      "expected_results": ["Successful login", "User session created"],
      "edge_cases": ["Invalid credentials", "Network errors"]
    }
  },
  tags=["task", f"issue-{task.id}"]
)
```

### Поиск документа задачи
```bash
# По ID задачи в заголовке
docs = find_documents(project_id=task.project_id, query=f"Issue #{task.id}")

# По ID документа
doc = find_documents(project_id=task.project_id, document_id="doc-xxx")
```

### Минимальное содержимое документа
- Goal / Definition of Done (DoD)
- Архитектура / решение (коротко)
- Файлы / точки входа
- Тест-план
- Риски / долги
- Progress notes (обновляется по ходу работы)
- Implementation summary (после завершения)

---

## Как описывать Project (Epic)

### Project в Archon
При создании Project указываем:
- **Title:** `EPIC: <кратко>`
- **Description:** 
  - Goal: что должно появиться для пользователя/системы
  - Why: зачем это делаем (коротко)
  - Scope: что входит
  - Non-goals: что точно не делаем
  - Constraints: тех/временные ограничения
  - Risks: 2–5 пунктов

Пример:
```bash
project = manage_project("create",
  title="EPIC: User Authentication System",
  description="""
## Goal
Implement complete user authentication with OAuth and email/password

## Why
Enable user accounts and personalized experience

## Scope
- Supabase Auth integration
- OAuth providers (Google, Discord)
- Email/password authentication
- User profile management

## Non-goals
- SSO for enterprises
- Biometric authentication

## Constraints
- Must use Supabase Auth (existing infrastructure)
- Complete in 2 weeks

## Risks
- OAuth provider API changes
- Migration of existing users
  """,
  github_repo="https://github.com/org/StockInfo"
)
```

### Правило декомпозиции
Planner-агент должен разбить Project на **8–15 задач**:
- каждая задача должна быть достаточно маленькой, чтобы её можно было довести до PR
- каждая задача должна иметь свой Archon Document

---

## Как описывать Task — примеры

**Title:** `<глагол + объект> (коротко)`

Примеры:
- `Add login endpoint`
- `Implement portfolio table rendering`
- `Fix caching for quotes endpoint`

### Создание Task в Archon
```bash
task = manage_task("create",
  project_id=project.id,
  title="Setup Supabase auth providers",
  description="""
## Context
We need to configure authentication in Supabase for user login.

## Goal
Configure OAuth providers (Google, Discord) and email/password authentication in Supabase dashboard and integrate with the app.

## Definition of Done (DoD)
- [ ] OAuth providers configured in Supabase
- [ ] Email/password authentication enabled
- [ ] Auth client configured in src/utils/supabase/
- [ ] Test users created and verified
- [ ] Documentation updated
- [ ] Archon Document updated with implementation details
- [ ] PR opened and linked

## Out of Scope
- User profile UI (separate task)
- Password reset flow (separate task)

## Test Plan
1. Open login page
2. Test Google OAuth flow
3. Test Discord OAuth flow
4. Test email/password login
5. Verify user session persistence

## Dependencies
None

## Notes
Use existing Supabase project
  """,
  status="todo",
  task_order=10,
  feature="authentication"
)
```

### Пример DoD (типовой)
- [ ] Реализовано согласно Goal
- [ ] Добавлены/обновлены тесты (или обосновано почему нет)
- [ ] Не ломает существующий функционал
- [ ] Обновлены docs/комментарии при необходимости
- [ ] Archon Document обновлён итоговым решением и шагами проверки
- [ ] PR оформлен и привязан к Task

---

## Метаданные задач (для фильтрации и поиска)

Рекомендуемые поля в Task:
- **status**: `todo | doing | review | done | blocked`
- **task_order**: приоритет (0-100, выше = важнее)
- **assignee**: кто исполняет (`"User"`, `"Worker Agent"`, `"Planner Agent"` и т.д.)
- **feature**: группировка по фиче (`"authentication"`, `"portfolio"`, `"api"`)

Поиск и фильтрация:
```bash
# Все задачи проекта
tasks = find_tasks(filter_by="project", filter_value=project.id)

# Задачи в работе
tasks = find_tasks(filter_by="status", filter_value="doing")

# Задачи по фиче
tasks = find_tasks(query="authentication", per_page=20)

# Конкретная задача
task = find_tasks(task_id="task-xxx")
```

> Смысл метаданных: помогать фильтровать и выдавать агентам "очередь задач".

---

## Зависимости и параллельность

### Как отмечать зависимости
В Task description или в Archon Document добавляй:
- `Dependencies: Task #<id>, Task #<id>`

В описании Project — держи информацию о зависимостях:
- **Dependency map:** какие задачи блокируют какие

### Как отмечать "можно параллельно"
В описании Project группируй задачи:
- **Parallel group A:** Task #1, #2, #3
- **Parallel group B:** Task #4, #5

Или используй поле `feature` для группировки:
```bash
# Все задачи одной фичи могут выполняться параллельно
tasks = find_tasks(query="authentication")
```

---

## Жизненный цикл задачи (как она движется по статусам)

### todo → doing
Когда задачу берёт Worker:
```bash
# Назначить себя и начать работу
manage_task("update", task_id="task-xxx", status="doing", assignee="Worker Agent")
```
- пишет короткий комментарий в description "беру в работу"
- убеждается, что Archon Document есть и актуален

### doing → review
Когда открыт PR:
```bash
# Перевести в ревью
manage_task("update", task_id="task-xxx", status="review")

# Обновить документацию
manage_document("update", document_id="doc-xxx", content={
  ...existing,
  "implementation_summary": "Added auth providers configuration...",
  "status": "In Review"
})
```
- PR **связан с Task** (в PR description: `Closes Task #<id>`)
- Worker обновляет Archon Document "что сделано / как проверить"

### review → done
Когда PR смёрджен:
```bash
# Завершить задачу
manage_task("update", task_id="task-xxx", status="done")

# Обновить статус в документации
manage_document("update", document_id="doc-xxx", content={
  ...existing,
  "status": "Done"
})
```

### blocked
Переводим в blocked, если:
- нужна внешняя инфа/решение
- заблокировано другой задачей
- требуется согласование архитектуры

```bash
manage_task("update", task_id="task-xxx", status="blocked")
```

В blocked обязательно:
- комментарий в description "почему" + что нужно, чтобы разблокировать

---

## Управление статусами через Archon

Все изменения статусов выполняются через Archon MCP tools:

```bash
# Получить задачи для проверки
blocked_tasks = find_tasks(filter_by="status", filter_value="blocked")
doing_tasks = find_tasks(filter_by="status", filter_value="doing")

# Обновить статус
manage_task("update", task_id="task-xxx", status="todo")  # разблокировать
```

---

## Регулярные проверки

### Daily / ad-hoc (быстро)
```bash
# Проверить блокированные задачи
blocked = find_tasks(filter_by="status", filter_value="blocked")

# Проверить задачи в работе
doing = find_tasks(filter_by="status", filter_value="doing")
```
- снять блокеры
- убедиться, что doing не растёт бесконечно (WIP limit)

### Weekly (10–20 минут)
```bash
# Все проекты
projects = find_projects()

# Задачи по проектам
for project in projects:
    tasks = find_tasks(filter_by="project", filter_value=project.id)
```
- привести задачи в порядок
- уточнить приоритеты (task_order)
- убедиться, что Projects разбиты на задачи

---

## Быстрые "anti-patterns" (чего избегать)
- Задачи без DoD ("сделай красиво")
- Задачи без Archon Document (память теряется, агенты буксуют)
- Одна задача = половина проекта (невозможно параллелить)
- doing неделями без PR (лучше дробить ещё)
- PR без связи с Task (ломает трекинг)
- Забывать обновлять Archon Document перед PR
- Не переводить статусы в Archon после изменений
