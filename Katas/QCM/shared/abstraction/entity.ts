const isEntity = (v: any): v is Entity<any, any> => {
  return v instanceof Entity;
};

export abstract class Entity<TProps extends { id: string }, TDto> {
  constructor(protected readonly props: TProps) {}

  public equals(object?: Entity<TProps, TDto>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this.props.id === object.props.id;
  }

  public abstract serialize(): TDto;
}
