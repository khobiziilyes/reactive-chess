import { getColumnCode } from "./helpers";

export default function ChessHeader() {
  return new Array(10).fill(null).map((_, i) => (
    <td className="chess-text" key={`header-${i}`}>
      {![0, 9].includes(i) && getColumnCode(i - 1)}
    </td>
  ));
}
