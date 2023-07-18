import TValue from './graphql/value.type';
import { handler as saveValue } from './saveValue';

type AppSyncEvent = {
  info: {
    fieldName: string;
  };
  arguments: {
    value: TValue;
  };
};

export async function handler(event: AppSyncEvent) {
  switch (event.info.fieldName) {
    case 'enterValue':
      // @ts-ignore
      return await saveValue(event.arguments.value);
    default:
      return null;
  }
}
