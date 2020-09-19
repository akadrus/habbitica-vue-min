import { shallowMount } from "@vue/test-utils";
import Board from "@/components/Board.vue";

describe("Board.vue", () => {
  it("renders board slug", () => {
    let testBoard = {
      name: "testBoardName"
    };
    const wrapper = shallowMount(Board, {
      propsData: {
        board: testBoard
      }
    });
    expect(wrapper.text()).toMatch(testBoard.name);
  });
});
