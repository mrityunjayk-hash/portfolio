import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  a: ({ href = "", ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...props}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      />
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
