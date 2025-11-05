import { redirect } from "next/navigation";

export default function Home() {
  // Root page redirects to landing page
  // Middleware will handle A/B test routing
  redirect("/landing");
}
