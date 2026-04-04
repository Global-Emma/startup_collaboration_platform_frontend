import * as Icons from "lucide-react";
import { Link } from "react-router-dom";

const IconRenderer = ({ name, size = 40, color = "#4B5563" }) => {
  const Icon = Icons[name];

  // fallback if icon doesn't exist
  if (!Icon) {
    const DefaultIcon = Icons.HelpCircle;
    return <DefaultIcon size={size} color={color} />;
  }

  return <Icon size={size} color={color} />;
};

const Services = ({ service }) => {
  const iconName =  service.icon
  const capitalizedIconName = iconName.charAt(0).toUpperCase() + iconName.slice(1).replace(/\s/g, '');

  const serviceName = service.name.toLowerCase()
  const capitalizedServiceName = serviceName.charAt(0).toUpperCase() + serviceName.slice(1);
  return (
    <>
      <Link to={`/services/${service._id}`} className="service-card">
        <div className="icon">
          <IconRenderer name={capitalizedIconName} />
        </div>
        <p>{capitalizedServiceName}</p>
      </Link>
    </>
  );
};

export default Services;
