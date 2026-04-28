<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Booking System Project Rules

## Core Requirements
- **Framework**: Next.js (App Router)
- **Database/Backend**: Supabase (Auth, PostgreSQL, Realtime, Storage)
- **Logic**: Follow the provided blueprint logic EXACTLY, especially for slot generation and conflict prevention.
- **Architecture**: Maintain Clean Architecture (separation of concerns, functional core).
- **i18n**: Support English (en) and Arabic (ar) with full RTL support.
- **Design**: Implement the Premium Gold/Tan design system with Light/Dark mode support.

## Technical Constraints
- All database operations must go through Supabase.
- Use PostgreSQL triggers for source-of-truth conflict prevention (double-booking).
- Business logic for time slot generation must be implemented in the functional core.
- Layouts must support dynamic directionality (RTL for Arabic).
