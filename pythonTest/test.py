class Solution:
    def twoSum(self, nums, target):
        dct = {}
        for i, n in enumerate(nums):
            if target - n in dct:
                return [dct[target - n], i]
            dct[n] = i


if __name__ == "__main__":
    print(Solution().twoSum([2, 7, 11, 15], 9))

    print(Solution().twoSum([3, 3], 6))
