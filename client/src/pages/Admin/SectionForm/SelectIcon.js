import * as I from '../../../components/Inputs';
import * as S from './style';
import { contentColors } from '../../../constants';
import Icon from '../../../components/Icon';

const SelectIcon = ({ themeKey, setState }) => {
  return (
    <I.Dropdown
      label="Select Icon"
      placeholder="Select Icon"
      height={'60px'}
      handleChange={(v) => setState({ themeKey: v })}
      selected={
        themeKey
          ? {
              value: themeKey,
              label: (
                <S.IconDropdownItem
                  bg={contentColors[themeKey].bg}
                  color={contentColors[themeKey].iconColor}
                >
                  <Icon
                    icon={contentColors[themeKey].icon}
                    color={contentColors[themeKey].iconColor}
                    width={40}
                    height={40}
                    pointer
                  />
                </S.IconDropdownItem>
              ),
            }
          : null
      }
      options={
        Object.entries(contentColors).map(([key, value]) => ({
          value: key,
          label: (
            <S.IconDropdownItem bg={value.bg}>
              <Icon
                icon={value.icon}
                color={value.iconColor}
                width={40}
                height={40}
                pointer
              />
            </S.IconDropdownItem>
          ),
        })) || []
      }
    />
  );
};

export default SelectIcon;
