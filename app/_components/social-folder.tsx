type SocialFolderProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  href: string;
  assetKey: "linkedin" | "dribbble" | "behance";
  reveal?: boolean;
};

export function SocialFolder({ id, name, description, category, href, assetKey, reveal = true }: SocialFolderProps) {
  return (
    <a id={id} className={reveal ? "social-folder scroll-reveal" : "social-folder"} href={href} target="_blank" rel="noreferrer">
      <div className={`folder-preview folder-preview-${assetKey}`} aria-hidden="true">
        <img className="folder-float" src={`/images/social/cards/${assetKey}.svg`} alt="" />
      </div>
      <img className="folder-panel-shape" src="/icons/folder-front.svg" alt="" />
      <div className="folder-body">
        <div className="folder-heading"><b>{name}</b><span>{description}</span></div>
        <div className="folder-meta">
          <span>{category}</span>
          <span className="folder-arrow" aria-hidden="true"><img src="/icons/arrow-up-right.svg" alt="" /></span>
        </div>
      </div>
    </a>
  );
}
