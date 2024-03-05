import { ContactStatic } from "src/api/contacts/model/contact.model";
import { UserStatic } from "src/api/users/models/user.model";

export const userHasOneContact = ({
  user,
  contact,
}: {
  user: UserStatic;
  contact: ContactStatic;
}): void => {
  user.hasOne(contact, {
    foreignKey: "user_id",
    sourceKey: "id",
  });
  contact.belongsTo(user, {
    foreignKey: "user_id",
    targetKey: "id",
  });
};
