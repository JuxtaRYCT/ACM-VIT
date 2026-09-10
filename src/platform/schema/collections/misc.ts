import { z } from "zod";

/** Grid cassette on /projects. Discriminated on `kind`. */
export const gridProjectSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("overlay"),
    slug: z.string(),
    order: z.number().optional(),
    name: z.string(),
    color: z.string(),
    image: z.string(),
    alt: z.string(),
    url: z.string(),
    sizePercent: z.number(),
    sizeAxis: z.enum(["width", "height"]),
    offsetY: z.number(),
  }),
  z.object({
    kind: z.literal("svg"),
    slug: z.string(),
    order: z.number().optional(),
    name: z.string(),
    color: z.string(),
    cassetteSvg: z.string(),
    alt: z.string(),
    url: z.string(),
    comingSoon: z.boolean().optional(),
  }),
]);
export type GridProjectEntry = z.infer<typeof gridProjectSchema>;

/**
 * Calendar entries are categorised by *what kind of thing happened*, not by the
 * domain that ran it - a full core meet and a hackathon read very differently on
 * a calendar, whereas "tech" vs "research" does not. `blog` is not authored: the
 * calendar injects blog posts at runtime from /api/blog-dates.
 *
 * There is deliberately no `recruitment` category. Board application forms and
 * deadlines, junior core interviews and inductions - anything about selecting the
 * next batch - never go on the public calendar, so the schema gives them nowhere
 * to live. See content/collections/calendar-events/README.md.
 */
export const calendarCategory = z.enum([
  "event",
  "ctf",
  "workshop",
  "session",
  "meeting",
  "social",
  "launch",
  "blog",
]);
export type EventCategory = z.infer<typeof calendarCategory>;

export const calendarEventSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  id: z.string(),
  title: z.string(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  category: calendarCategory,
  description: z.string(),
  location: z.string(),
  href: z.string().optional(),
});
export type CalendarEventEntry = z.infer<typeof calendarEventSchema>;

export const achievementSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  org: z.string(),
  year: z.string(),
  blurb: z.string(),
  place: z.string().optional(),
  image: z.string().optional(),
});
export type AchievementEntry = z.infer<typeof achievementSchema>;

export const teamMemberSchema = z.object({
  title: z.string(),
  fullName: z.string(),
  position: z.string(),
  imageUrl: z.string(),
  linkedinUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  googleScholarUrl: z.string().optional(),
  isW: z.boolean().optional(),
});
export type TeamMemberEntry = z.infer<typeof teamMemberSchema>;

export const teamYearSchema = z.object({
  slug: z.string(),
  year: z.number(),
  /** Display label when the board spanned two academic years, e.g. "2019-2020". */
  label: z.string().optional(),
  members: z.array(teamMemberSchema),
});
export type TeamYearEntry = z.infer<typeof teamYearSchema>;

export const forktoberMetaSchema = z.object({
  slug: z.string(),
  order: z.number().optional(),
  title: z.string(),
  repo: z.string(),
  years: z.array(z.number()),
  description: z.string(),
});
export type ForktoberMetaEntry = z.infer<typeof forktoberMetaSchema>;
