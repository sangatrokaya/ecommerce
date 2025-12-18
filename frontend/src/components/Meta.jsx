import { Helmet } from "react-helmet-async";

function Meta({
  title = "Welcome to TechVault",
  description = "Your one-stop for tech essentials and gadgets.",
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

export default Meta;
