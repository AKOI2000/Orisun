import Link from 'next/link';

export default function FilterTabs({ tabs, activeValue, buildHref, className = '' }) {
  return (
    <div className={`filter-tabs ${className}`}>
      {tabs.map((tab) => (
        <Link
          key={tab.value}
          href={buildHref(tab.value)}
          className={`filter-tabs__tab ${activeValue === tab.value ? 'filter-tabs__tab--active' : ''}`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}