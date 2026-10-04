import { DocPage } from "@/components/docs/DocPage";

export default function NotFound() {
  return (
    <DocPage
      title="Page not found"
      description="That URL is not part of this documentation set."
    >
      <p>
        Use the navigation to return to a documented section of the showcase.
      </p>
    </DocPage>
  );
}
