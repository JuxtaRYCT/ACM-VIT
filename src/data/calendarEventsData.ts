// COMPAT SHIM - calendar entries now live in content/collections/calendar-events/
// and are edited via the CMS. CATEGORY_COLORS is presentation (theme tokens), so it
// stays in code. This module re-exports the compiled snapshot from src/generated/.
// NOTE: imported from client-side <script> tags too - keep it bundle-safe
// (type-only imports from the schema package, values only from src/generated/).
import { items as calendarEntries } from "../generated/calendar-events";
import type { CalendarEventEntry, EventCategory } from "../platform/schema/collections/misc";

export type { EventCategory } from "../platform/schema/collections/misc";
export type CalendarEvent = CalendarEventEntry;

// Colour separates the *kind* of entry (meeting vs hackathon vs workshop), not the
// domain that ran it. Cassettes are the domain art with the wordmark stripped and
// the stripe recoloured - see public/cassettes/cassettes-cal-*.svg.
export const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; border: string; label: string; cassette: string }> = {
  event:       { bg: 'rgba(249, 95, 74, 0.2)',   text: '#F95F4A', border: '#F95F4A', label: 'Event',        cassette: '/cassettes/cassettes-cal-event.svg' },
  ctf:         { bg: 'rgba(255, 0, 84, 0.2)',    text: '#FF0054', border: '#FF0054', label: 'CTF',          cassette: '/cassettes/cassettes-cal-ctf.svg' },
  workshop:    { bg: 'rgba(155, 81, 224, 0.2)',  text: '#9B51E0', border: '#9B51E0', label: 'Workshop',     cassette: '/cassettes/cassettes-cal-workshop.svg' },
  session:     { bg: 'rgba(19, 93, 226, 0.2)',   text: '#135DE2', border: '#135DE2', label: 'Session',      cassette: '/cassettes/cassettes-cal-session.svg' },
  meeting:     { bg: 'rgba(0, 180, 180, 0.2)',   text: '#00B4B4', border: '#00B4B4', label: 'Meeting',      cassette: '/cassettes/cassettes-cal-meeting.svg' },
  social:      { bg: 'rgba(242, 169, 59, 0.2)',  text: '#F2A93B', border: '#F2A93B', label: 'Social',       cassette: '/cassettes/cassettes-cal-social.svg' },
  launch:      { bg: 'rgba(66, 205, 157, 0.2)',  text: '#42CD9D', border: '#42CD9D', label: 'Launch',       cassette: '/cassettes/cassettes-cal-launch.svg' },
  blog:        { bg: 'rgba(140, 154, 174, 0.2)', text: '#8C9AAE', border: '#8C9AAE', label: 'Blog Post',    cassette: '/cassettes/cassettes-cal-blog.svg' },
};

export const SAMPLE_EVENTS: CalendarEvent[] = calendarEntries;

/**
 * CTA shown on an entry's cassette label. The label names what is on the other
 * end rather than always saying "blog", and anything off-site opens in a new tab
 * with a note saying where it goes.
 */
export function eventLink(event: CalendarEvent): { href: string; label: string; note: string } | null {
  const href = event.href;
  if (!href) return null;

  const external = /^https?:\/\//i.test(href);
  const host = external ? href.replace(/^https?:\/\//i, "").split("/")[0] : "";

  let label: string;
  if (host === "grep.acmvit.in") label = "Read Newsletter";
  else if (event.category === "blog") label = "Read Blog";
  else if (external) label = `Open ${host}`;
  else if (href === "/grep" || href.startsWith("/grep/")) label = "Read Newsletter";
  else if (href.startsWith("/z0d1ak")) label = "CTF Team";
  else if (href.startsWith("/events/")) label = "Event Page";
  else if (href.startsWith("/projects/")) label = "Project Page";
  else if (href.startsWith("/merchandise/")) label = "View Merch";
  else label = "Learn More";

  return {
    href,
    label: external ? `${label} ↗` : `${label} →`,
    note: external ? `Opens ${host} in a new tab` : "",
  };
}
