import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch (value) {
      case 'Frontend':
        return 'code';
      case 'Backend':
        return 'storage';
      case 'DevOps':
        return 'settings';
      case 'Mobile':
        return 'phone_iphone';
      case 'Design':
        return 'brush';
      case 'Data Science':
        return 'analytics';
      default:
        return 'help';
    }
  }
}
