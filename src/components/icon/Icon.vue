<script>
// TODO: 组织字体图标
import { getColor } from '@/utils';

export default {
  name: 'icon',
  props: {
    // 颜色
    color: {
      type: String,
      default: '',
    },
    // 尺寸大小
    size: {
      type: [Number, String],
      default: 'sm',  // 'xxs', 'xs', 'sm', 'md', 'lg'
    },
    // 尺寸单位
    sizeUnit: {
      type: String,
      default: 'rem',  // 'rem', 'px'
    },
    // icon 名称
    value: {
      type: String,
      required: true,
    },
  },
  // 渲染 DOM
  render(createElement) {
    const { value, size, sizeUnit, color } = this;
    const iconInternalClass = [];
    const iconInternalStyle = {};

    // 名称
    if (value && typeof color === 'string') {
      iconInternalClass.push(`icon-${value}`);
    }

    // 尺寸
    let sizeComputed = size;
    if (size && typeof size === 'number') {
      // 转换成 rem 尺寸
      if (sizeUnit !== 'px') {
        sizeComputed = size / 100;
      }
      iconInternalStyle.fontSize = `${sizeComputed}${sizeUnit}`;
    } else if (size && typeof size === 'string') {
      iconInternalClass.push(`icon-${size}`);
    }

    // 颜色
    if (color && typeof color === 'string') {
      iconInternalStyle.color = getColor(color);
    }

    return createElement(
      'i',
      {
        class: ['iconfont', iconInternalClass],
        style: iconInternalStyle,
      },
    );
  },
};
</script>

<style lang="scss">
@import "../../style/import";

// 字号 12*n =>> 尺寸占位 18*n
.icon-xxs {
  font-size: px2rem(36px);
}
.icon-xs {
  font-size: px2rem(48px);
}
.icon-sm {
  font-size: px2rem(60px);
}
.icon-md {
  font-size: px2rem(72px);
}
.icon-lg {
  font-size: px2rem(84px);
}
</style>
