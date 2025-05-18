import { Breadcrumbs } from "@/components/common/breadcrumbs";

const breadcrumbItems = [
  { title: 'Home', link: '/' },
  { title: 'Account', link: '/account' },
  { title: 'Password', link: '/account/password' }
];

const PasswordPage = () => {
  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} />
      <h1>Password page</h1>
    </div>
  );
}

export default PasswordPage;
