import { DocPage } from "./DocPage";

type PlaceholderDocProps = {
  title: string;
};

export function PlaceholderDoc({ title }: PlaceholderDocProps) {
  return (
    <DocPage
      title={title}
      description="This page will be documented in a later pass."
    >
      <p>
        The documentation shell is in place. Detailed content for this topic is
        not included yet.
      </p>
    </DocPage>
  );
}
