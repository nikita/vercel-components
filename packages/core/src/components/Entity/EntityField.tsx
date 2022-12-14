import { useContext } from "react";
import clsx from "clsx";
import { Skeleton } from "@components/Skeleton";
import { Container } from "@components/Container";
import { Text } from "@components/Text";
import { Spacer } from "@components/Spacer";
import MoreVerticalIcon from "@icons/MoreVertical";
import { PlaceHolderContext } from "./index";
import styles from "./Entity.module.css";
import dotsMenu from "./dots-menu.module.css";
import button from "@components/Button/button.module.css";
import reset from "@styles/reset.module.css";

interface EntityFieldProps {
  children?: React.ReactNode;
  description?: React.ReactNode;
  label?: boolean;
  right?: boolean;
  active?: boolean;
  thumbnail?: React.ReactNode;
  thumbnailSize?: number;
  thumbnailWrapOnMobile?: boolean;
  title?: React.ReactNode;
  width?: React.CSSProperties["width"];
  isFirstItem?: boolean;
  isLastItem?: boolean;
  actions?: React.ReactNode;
  avatar?: React.ReactNode;
  menuItems?: React.ReactNode;
  checkbox?: React.ReactNode;
  checkboxSize?: number;
  //
  titleSkeletonWidth?: string;
  descriptionSkeletonWidth?: string;
}

const EntityField = ({
  thumbnail,
  thumbnailSize = 36,
  thumbnailWrapOnMobile,
  actions,
  active,
  description,
  label,
  right,
  title,
  width,
  isLastItem,
  isFirstItem,
  avatar,
  menuItems,
  checkbox,
  titleSkeletonWidth,
  descriptionSkeletonWidth,
}: EntityFieldProps) => {
  const placeholder = useContext(PlaceHolderContext);

  const _description = (
    <Text
      as={"p"}
      className={clsx(
        styles.description,
        "geist-themed",
        "geist-ellipsis",
        "geist-secondary",
        "body-2"
      )}
    >
      {description}
    </Text>
  );

  return (
    <Container
      gap={2 / 3}
      row
      vcenter
      className={clsx(styles.field, {
        [styles.last]: isLastItem,
        [styles.first]: isFirstItem,
        [styles.avatarWrap]: thumbnailWrapOnMobile,
      })}
      style={
        width && {
          flexShrink: 0,
          flexGrow: 0,
          flexBasis: width,
        }
      }
    >
      {checkbox && (
        <div className={styles.checkbox}>
          {placeholder ? (
            <Skeleton
              {...{
                vcenter: true,
                height: 16,
                width: 16,
              }}
            />
          ) : (
            checkbox
          )}
        </div>
      )}

      {thumbnail}

      {/* entity_content */}

      <Container
        className={clsx(styles.content, {
          [styles.rightAligned]: right,
        })}
        style={undefined}
        vcenter
      >
        {/* Title */}
        {title &&
          (placeholder ? (
            <Skeleton
              vcenter
              height={16}
              boxHeight={20}
              width={titleSkeletonWidth || "40%"}
            />
          ) : (
            <Text
              as={"p"}
              className={clsx(
                "geist-themed",
                {
                  ["geist-default"]: !label && active !== false,
                  ["geist-secondary"]: label || active === false,
                },
                "geist-ellipsis",
                "body-2",
                label ? "label" : "w-600",
                {
                  [styles.title]: !label,
                  [styles.label]: label,
                }
              )}
            >
              {title}
            </Text>
          ))}

        {/* Description */}

        {description &&
          (placeholder ? (
            <Skeleton
              vcenter
              height={16}
              boxHeight={20}
              width={descriptionSkeletonWidth || "60%"}
            />
          ) : avatar ? (
            <div className={clsx(styles.descriptionWithAvatar)}>
              {_description}
              <Spacer x={0.5} />
              {avatar}
            </div>
          ) : (
            _description
          ))}
      </Container>

      {/* menuitems */}
      {menuItems && (
        <div className={styles.menu}>
          {placeholder ? (
            <Skeleton width={20} height={20} />
          ) : (
            <button
              className={clsx([button.base, reset.reset, dotsMenu.button])}
              onClick={() => alert("TODO: implement me")}
            >
              <span className={button.content}>
                <span className={dotsMenu.container}>
                  <span className={dotsMenu.menu}>
                    <MoreVerticalIcon size={18} weight={"light"} />
                  </span>
                </span>
              </span>
            </button>
          )}
        </div>
      )}

      {actions && (
        <div className={styles.actions}>
          {placeholder ? <Skeleton show>{actions}</Skeleton> : actions}
        </div>
      )}
    </Container>
  );
};

export default EntityField;
