import { OperatorKeys } from '../enums/operator-keys.enum';
import { IContext, IStateData } from '../interfaces';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { StateData } from '../models/state-data.model';
import { EnteringSecondNumberState } from './entering-second-number.state';

export class EnteringFirstNumberState implements ICalculatorState {

  public constructor(private _context: IContext, private _data: IStateData) { }

  public digit(digit: string): void {
    this._data.firstBuffer = this._data.firstBuffer === '0' && digit !== '0' ? digit : this._data.firstBuffer + digit;
  }

  public decimalSeparator(): void {
    if (this._data.firstBuffer.indexOf('.') === -1) {
      // ignore if the number already has a decimal separator
      this._data.firstBuffer += '.';
    }
  }

  public binaryOperator(operator: OperatorKeys): void {
    const newData: IStateData = new StateData.Builder()
      .withFirstBuffer(this._data.firstBuffer === '' ? '0' : this._data.firstBuffer)
      .withFirstOperator(operator)
      .build();

    this._context.changeState(
      new EnteringSecondNumberState(this._context, newData)
    );
  }

  public equals(): void {
    /* pressing equals after entering one number has no effect */
    this._context.changeState(this);
  }

  public clear(): void {
    this._context.changeState(new EnteringFirstNumberState(this._context, new StateData.Builder().build()));
  }

  public display(): string {
    return this._data.display();
  }
}
