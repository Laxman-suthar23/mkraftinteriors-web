/*
karni-interiors/
├── README.md
├── next.config.js
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── .env.local
├── .env.example
├── .gitignore
├── .eslintrc.json
├── middleware.ts
├── next-env.d.ts
├── postcss.config.js
├── components.json (for shadcn/ui)
│
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx (Home page)
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   │
│   ├── (auth)/
│   │   └── login/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   ├── (main)/
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   ├── portfolio/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       └── not-found.tsx
│   │   │
│   │   ├── gallery/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   ├── reviews/
│   │   │   ├── page.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   └── contact/
│   │       ├── page.tsx
│   │       └── loading.tsx
│   │
│   ├── (admin)/
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx (Dashboard)
│   │       ├── loading.tsx
│   │       │
│   │       ├── projects/
│   │       │   ├── page.tsx
│   │       │   ├── loading.tsx
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       ├── page.tsx
│   │       │       └── edit/
│   │       │           └── page.tsx
│   │       │
│   │       ├── reviews/
│   │       │   ├── page.tsx
│   │       │   ├── loading.tsx
│   │       │   ├── new/
│   │       │   │   └── page.tsx
│   │       │   └── [id]/
│   │       │       ├── page.tsx
│   │       │       └── edit/
│   │       │           └── page.tsx
│   │       │
│   │       ├── contacts/
│   │       │   ├── page.tsx
│   │       │   ├── loading.tsx
│   │       │   └── [id]/
│   │       │       └── page.tsx
│   │       │
│   │       └── settings/
│   │           ├── page.tsx
│   │           └── loading.tsx
│   │
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts
│       │
│       ├── projects/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       │
│       ├── reviews/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       │
│       ├── contact/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       │
│       ├── upload/
│       │   ├── route.ts
│       │   └── uploadthing/
│       │       └── route.ts
│       │
│       ├── team/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       │
│       └── stats/
│           └── route.ts
│
├── components/
│   ├── ui/ (shadcn/ui components)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── toast.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── table.tsx
│   │   ├── form.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   ├── skeleton.tsx
│   │   ├── tabs.tsx
│   │   ├── alert.tsx
│   │   └── avatar.tsx
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── Sidebar.tsx
│   │
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ImageCarousel.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── AboutPreview.tsx
│   │   ├── ServicesOverview.tsx
│   │   ├── TestimonialsPreview.tsx
│   │   └── CallToAction.tsx
│   │
│   ├── portfolio/
│   │   ├── ProjectGrid.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ProjectDetails.tsx
│   │   ├── ProjectGallery.tsx
│   │   ├── ProjectFilters.tsx
│   │   ├── ProjectSearch.tsx
│   │   └── ProjectNavigation.tsx
│   │
│   ├── gallery/
│   │   ├── ImageGrid.tsx
│   │   ├── MasonryGallery.tsx
│   │   ├── Lightbox.tsx
│   │   ├── GalleryFilters.tsx
│   │   └── ImageModal.tsx
│   │
│   ├── about/
│   │   ├── CompanyProfile.tsx
│   │   ├── TeamSection.tsx
│   │   ├── TeamMember.tsx
│   │   ├── MissionStatement.tsx
│   │   ├── CompanyHistory.tsx
│   │   └── Values.tsx
│   │
│   ├── reviews/
│   │   ├── ReviewsGrid.tsx
│   │   ├── ReviewCard.tsx
│   │   ├── StarRating.tsx
│   │   ├── ReviewForm.tsx
│   │   └── ReviewModal.tsx
│   │
│   ├── contact/
│   │   ├── ContactForm.tsx
│   │   ├── ContactInfo.tsx
│   │   ├── GoogleMap.tsx
│   │   ├── BusinessHours.tsx
│   │   ├── SocialLinks.tsx
│   │   └── RecaptchaWrapper.tsx
│   │
│   ├── admin/
│   │   ├── AdminLayout.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── AdminSidebar.tsx
│   │   ├── Dashboard/
│   │   │   ├── StatsCards.tsx
│   │   │   ├── RecentActivity.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── Charts.tsx
│   │   │
│   │   ├── Projects/
│   │   │   ├── ProjectsTable.tsx
│   │   │   ├── ProjectForm.tsx
│   │   │   ├── ProjectEditor.tsx
│   │   │   ├── ImageUploader.tsx
│   │   │   └── ProjectActions.tsx
│   │   │
│   │   ├── Reviews/
│   │   │   ├── ReviewsTable.tsx
│   │   │   ├── ReviewForm.tsx
│   │   │   ├── ReviewEditor.tsx
│   │   │   └── ReviewActions.tsx
│   │   │
│   │   ├── Contacts/
│   │   │   ├── ContactsTable.tsx
│   │   │   ├── ContactDetails.tsx
│   │   │   ├── ContactActions.tsx
│   │   │   └── ContactFilters.tsx
│   │   │
│   │   └── Settings/
│   │       ├── ProfileSettings.tsx
│   │       ├── SiteSettings.tsx
│   │       ├── EmailSettings.tsx
│   │       └── SecuritySettings.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── AuthProvider.tsx
│   │
│   ├── common/
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ConfirmDialog.tsx
│   │   ├── Toast.tsx
│   │   ├── Modal.tsx
│   │   ├── Pagination.tsx
│   │   ├── SearchBox.tsx
│   │   ├── FilterDropdown.tsx
│   │   ├── SortSelector.tsx
│   │   ├── BackButton.tsx
│   │   └── ScrollToTop.tsx
│   │
│   └── animations/
│       ├── FadeIn.tsx
│       ├── SlideIn.tsx
│       ├── ScaleIn.tsx
│       ├── PageTransition.tsx
│       └── AnimatedCounter.tsx
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── utils.ts
│   ├── constants.ts
│   ├── validations/
│   │   ├── project.ts
│   │   ├── review.ts
│   │   ├── contact.ts
│   │   ├── auth.ts
│   │   └── admin.ts
│   │
│   ├── hooks/
│   │   ├── useProjects.ts
│   │   ├── useReviews.ts
│   │   ├── useContacts.ts
│   │   ├── useAuth.ts
│   │   ├── useTheme.ts
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── useInfiniteScroll.ts
│   │
│   ├── services/
│   │   ├── projectService.ts
│   │   ├── reviewService.ts
│   │   ├── contactService.ts
│   │   ├── uploadService.ts
│   │   ├── emailService.ts
│   │   └── analyticsService.ts
│   │
│   └── config/
│       ├── database.ts
│       ├── email.ts
│       ├── upload.ts
│       ├── auth.ts
│       └── site.ts
│
├── types/
│   ├── index.ts
│   ├── project.ts
│   ├── review.ts
│   ├── contact.ts
│   ├── user.ts
│   ├── team.ts
│   ├── api.ts
│   └── auth.ts
│
├── styles/
│   ├── globals.css
│   ├── components.css
│   └── animations.css
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── logo-dark.svg
│   ├── apple-touch-icon.png
│   ├── robots.txt
│   ├── sitemap.xml
│   │
│   ├── images/
│   │   ├── hero/
│   │   │   ├── hero-1.jpg
│   │   │   ├── hero-2.jpg
│   │   │   └── hero-3.jpg
│   │   │
│   │   ├── team/
│   │   │   ├── priya-karni.jpg
│   │   │   ├── rajesh-sharma.jpg
│   │   │   └── anjali-patel.jpg
│   │   │
│   │   ├── projects/
│   │   │   ├── project-1/
│   │   │   ├── project-2/
│   │   │   └── project-3/
│   │   │
│   │   ├── about/
│   │   │   ├── office-1.jpg
│   │   │   ├── office-2.jpg
│   │   │   └── team-photo.jpg
│   │   │
│   │   └── icons/
│   │       ├── social/
│   │       ├── services/
│   │       └── awards/
│   │
│   └── documents/
│       ├── company-profile.pdf
│       ├── portfolio-brochure.pdf
│       └── services-guide.pdf
│
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   │   └── [timestamp]_init/
│   │       └── migration.sql
│   │
│   └── seed.ts
│
├── emails/ (for React Email templates)
│   ├── ContactFormSubmission.tsx
│   ├── WelcomeEmail.tsx
│   ├── ProjectInquiry.tsx
│   └── components/
│       ├── EmailLayout.tsx
│       ├── Header.tsx
│       └── Footer.tsx
│
├── tests/
│   ├── __mocks__/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── e2e/
│   │   ├── home.spec.ts
│   │   ├── portfolio.spec.ts
│   │   ├── contact.spec.ts
│   │   └── admin.spec.ts
│   │
│   ├── setup.ts
│   └── utils.ts
│
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   ├── CONTRIBUTING.md
│   └── CHANGELOG.md
│
└── scripts/
    ├── build.sh
    ├── deploy.sh
    ├── backup-db.sh
    └── seed-data.js
*/
