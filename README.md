# School Hub Pro

Build a complete responsive frontend prototype for a School Fee Management SaaS Portal.

IMPORTANT:

This is a UI prototype only.

Do NOT build a backend.

Do NOT create PostgreSQL/database integration.

Do NOT create real authentication.

Use realistic mock data/local state only.

Focus ONLY on the Super Admin and Principal/Admin panels.

Parent, Student and Teacher portals are NOT part of this prototype.

Make the entire application functional as a frontend demo using mock data.

Avoid unnecessary features so the implementation stays focused and lightweight.

TECH / UI

Use:

React

TypeScript

Tailwind CSS

shadcn/ui components where useful

Responsive design for desktop, tablet and mobile

Clean modern SaaS dashboard design

Professional school-management visual style

Good spacing, typography, cards, tables, forms and empty states

Sidebar navigation with collapsible behavior on smaller screens

Top header with page title, notifications icon and profile menu

Use realistic Indian school data and ₹ currency

Create a polished application rather than a simple wireframe.

AUTH / ROLE SELECTION

Create a Login page with:

School Code

User ID

Password

Show/hide password

Remember me

Login button

For this prototype, provide a simple role/demo selector so the UI can be tested as:

Super Admin

Principal

The login does not need real authentication.

After selecting/logging in as Super Admin → open Super Admin Dashboard.

After selecting/logging in as Principal → open Principal Dashboard.

SUPER ADMIN PANEL

Create a dedicated Super Admin layout.

Sidebar:

Dashboard

Schools

Add School

Principals

Settings

Super Admin Dashboard

Show:

Total Schools

Active Schools

Total Principals

Recently Added Schools

Add:

Recent schools table

School status badges

Quick Actions

Add School button

View Schools button

Use realistic mock data such as:

St. Francis Secondary School
Delhi Public School
Green Valley Public School
Sunrise International School

School cards/table should show:

School Name

School Code

Location

Principal

Contact

Status

Created Date

Actions

Schools Page

Create a searchable/filterable schools table.

Columns:

School Name

School Code

Address/City

Principal

Contact

Status

Created Date

Actions

Actions:

View

Edit

Activate/Deactivate

Include:

Search

Status filter

Add School button

Pagination-style UI

Add School Page

Create a professional form:

School Information:

School Name

School Code

Address

City

State

Pincode

Email

Contact Number

Principal Information:

Principal Name

Username

Temporary Password

Buttons:

Create School

Cancel

After creating, show a success state/toast.

School Details

Show:

School information

Principal information

School status

Number of students

Number of classes

Number of sections

Add an "Edit School" action.

PRINCIPAL PANEL

Create a separate Principal/Admin layout.

Sidebar:

Dashboard

Students

Admission

Parents

Classes & Sections

Fee Structure

Discount Rules

User Management

Settings

Principal Dashboard

Show summary cards:

Total Students

Total Classes

Total Sections

New Admissions

Fee Structure Status

Active Discounts

Create:

Student distribution by class

Recent admissions table

Quick actions

Fee summary card

Quick actions:

Admit Student

Add Class

Manage Fee Structure

Manage Discounts

Search Parent

Use realistic student data.

CLASSES & SECTIONS

Create a Classes & Sections management page.

Display classes like:

Class 1
Class 2
Class 3
Class 4
Class 5
...
Class 12

Each class should show its sections.

Example:

Class 5

Section A

Section B

Section C

Allow mock UI actions:

Add Class

Add Section

Edit

Delete

Show student count per section.

Example:

Class 5
Section A — 32 students
Section B — 29 students
Section C — 31 students

STUDENTS

Create a Students page.

Features:

Search students

Filter by class

Filter by section

Search by admission number

View student

Edit student

Table columns:

Admission No.

Student Name

Class

Section

Parent

Admission Date

Fee

Status

Actions

Add student button should open/navigate to Admission page.

STUDENT ADMISSION

Create a polished multi-section admission form.

Sections:

Student Information

Full Name

Date of Birth

Gender

Class

Section

Admission Date

Email

Contact Number

Address

Parent / Guardian

Parent Name

Father's Name

Mother's Name

Address / Village

Phone Number (optional)

Email (optional)

IMPORTANT:
Phone and email must visually appear OPTIONAL.

Existing Parent Search

Create a clear "Search Existing Parent" area.

Search fields:

Parent Name

Father's Name

Address/Village

Display matching mock results with:

Parent Name

Father's Name

Village

Existing children

Child's Class

Admission Year

Example:

Raj Kumar
Father: Mohan Lal
Village: Dasna

Children:

Rahul Kumar — Class 5 — 2025

Priya Kumar — Class 2 — 2026

Actions:

Select Parent

Create New Parent

Clearly communicate that the Principal manually confirms the correct parent.

Fee Information

Show:

Academic Year

Class

Base Fee

Discount Type

Discount %

Discount Amount

Final Fee

Base fee should auto-populate based on selected class using mock data.

Allow the Principal to edit/confirm the fee.

Discount options:

No Discount

Custom %

Sibling Discount

Staff / Management Discount

Show a fee calculation summary card.

Example:

Base Fee: ₹25,000
Discount: 10%
Discount Amount: ₹2,500
Final Fee: ₹22,500

Create admission button.

PARENTS

Create Parent Management page.

Table:

Parent ID

Auto-generated Username

Parent Name

Father's Name

Village/Address

Phone

Email

Number of Children

Actions

IMPORTANT:
Parent username must visually demonstrate the required pattern:

SCH0001-P0451

Do NOT use phone number or email as the username.

Parent details page should show:

Parent information

Login username

Children list

Class/Section of each child

Admission year

Link/Unlink student actions

Add "Unlink / Re-map Student" UI.

FEE STRUCTURE

Create Fee Structure management.

Allow selection:

Academic Year

Class

Display:

Class 5
2025-26
₹20,000

Class 5
2026-27
₹22,000

Class 6
2025-26
₹22,000

Important UI requirement:

Show historical academic years separately.

Do NOT design the UI as if old fee amounts are overwritten.

Actions:

Add Fee Structure

Edit

View History

Include a history table:

Academic Year | Class | Fee Amount | Status

DISCOUNT RULES

Create a configurable Discount Rules page.

Show cards/forms for:

No Discount

Default option.

Sibling Discount

Fields:

2 Children Discount %
Example: 10%

3+ Children Rule
Full fee waiver on the sibling with the lowest fee.

Clearly explain this rule in the UI.

Staff / Management Discount

Enable/Disable

Discount %
Example: 25%

Custom Discount

Allow Principal to apply a custom percentage during admission.

Add Save Changes button.

USER MANAGEMENT

Create a User Management page.

Tabs:

Principals/Admins

Parents

Students

For current prototype, show mock users.

Columns:

Name

Username

Role

Status

Created Date

Actions

Actions:

View

Reset Password

Activate/Deactivate

Also create a Change Password UI in profile/settings.

DESIGN REQUIREMENTS

Make the UI feel like a real production SaaS application.

Use:

Clean sidebar

Modern dashboard cards

Professional tables

Modal dialogs

Dropdowns

Form validation states

Toast notifications

Confirmation dialogs

Status badges

Breadcrumbs where appropriate

Loading/empty states where useful

Responsive mobile navigation

Use a consistent design system across both Super Admin and Principal panels.

Avoid excessive gradients, flashy animations or unnecessary decorative elements.

Prioritize usability and information density.

RESPONSIVENESS

The application MUST work properly at:

Desktop

Laptop

Tablet

Mobile

Tables should become horizontally scrollable or transform appropriately on smaller screens.

Sidebar should collapse into a mobile menu.

Forms should stack properly on mobile.

Cards should adapt to smaller widths.

No horizontal page overflow.

MOCK DATA

Use realistic mock data for:

Schools:

St. Francis Secondary School

Delhi Public School

Green Valley Public School

Sunrise International School

Classes:
1 through 12

Sections:
A, B, C

Students:
Use realistic Indian names.

Parents:
Use realistic Indian names and villages.

Fees:
Use ₹ amounts and academic years such as:
2025-26
2026-27

ROUTING

Implement frontend routes for:

/login

/super-admin
/super-admin/schools
/super-admin/schools/new
/super-admin/schools/:id

/principal
/principal/students
/principal/admission
/principal/parents
/principal/classes
/principal/fees
/principal/discounts
/principal/users
/principal/settings

Navigation must work between all screens.

FINAL QUALITY BAR

Before considering the task complete:

Verify all routes work.

Verify sidebar navigation works.

Verify buttons have meaningful UI actions.

Verify forms are usable.

Verify mock data appears correctly.

Verify Super Admin and Principal layouts are visually distinct but consistent.

Verify mobile responsiveness.

Verify there is no broken UI.

Keep the implementation focused only on this prototype.

Do not add Parent Portal, Student Portal or Teacher Portal.

Do not spend effort on backend/database/authentication.

The goal is a polished frontend prototype demonstrating the complete Super Admin + Principal workflow for the School Fee Management Portal.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/89e736fe-e227-44a3-98ba-7ff26e44aad1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
