import ProfileUserStore from "@/components/store/account/profile";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import React from "react";

const breadcrumbItems = [
  { title: 'Home', link: '/' },
  { title: 'Account', link: '/account' }
];

const Page: React.FC = () => {
  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <ProfileUserStore />
    </div>
  );
};

export default Page;
