import { UniqueID } from 'src/domain/users/enterprise/entities/value-objects/unique-id';

export abstract class BaseEntity<Property> {
  private id: UniqueID;
  protected props: Property;

  constructor(props: Property, id?: string) {
    this.props = props;
    this.id = UniqueID.transform({ value: id });
  }

  public getId(): UniqueID {
    return this.id;
  }
}
