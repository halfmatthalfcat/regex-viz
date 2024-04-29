declare module "use-custom-compare-effect" {
  declare const useCustomCompareEffect: <D>(
    fn: () => any,
    deps: D,
    compare: (prev: D, curr: D) => boolean
  ) => void;

  export default useCustomCompareEffect;
}
