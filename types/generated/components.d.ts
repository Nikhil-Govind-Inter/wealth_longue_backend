import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    displayName: 'Footer';
    icon: 'crop';
  };
  attributes: {
    address: Schema.Attribute.RichText;
    description: Schema.Attribute.Blocks;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    >;
    navigations: Schema.Attribute.Component<'layout.footer-navigations', true>;
    office_location: Schema.Attribute.Component<
      'layout.office-locations',
      false
    >;
    social_media: Schema.Attribute.Component<'layout.social-media', true>;
  };
}

export interface GlobalHeader extends Struct.ComponentSchema {
  collectionName: 'components_global_headers';
  info: {
    displayName: 'Header';
    icon: 'bulletList';
  };
  attributes: {
    base_url: Schema.Attribute.String;
    login_button: Schema.Attribute.Component<'utils.link', false>;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    >;
    nav_links: Schema.Attribute.Component<'utils.link', true>;
  };
}

export interface HomeComponentHomeAbout extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_abouts';
  info: {
    displayName: 'Home About';
    icon: 'chartBubble';
  };
  attributes: {
    button: Schema.Attribute.Component<'utils.link', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    > &
      Schema.Attribute.Required;
    spec_items: Schema.Attribute.Component<
      'home-component.specifications',
      true
    > &
      Schema.Attribute.Required;
    sub_title: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentHomeBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_banners';
  info: {
    displayName: 'Home Banner';
    icon: 'brush';
  };
  attributes: {
    button: Schema.Attribute.Component<'utils.link', false> &
      Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    media: Schema.Attribute.Component<'utils.media-with-type', false> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentHomeService extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_services';
  info: {
    displayName: 'Home Service';
    icon: 'command';
  };
  attributes: {
    button: Schema.Attribute.Component<'utils.link', false>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    service_items: Schema.Attribute.Component<
      'home-component.service-items',
      true
    > &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentHomeTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_home_component_home_testimonials';
  info: {
    displayName: 'Home Testimonials';
    icon: 'cup';
  };
  attributes: {
    testimonial_items: Schema.Attribute.Component<
      'home-component.testimonial-items',
      true
    >;
    tite: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentServiceItems extends Struct.ComponentSchema {
  collectionName: 'components_home_component_service_items';
  info: {
    displayName: 'Service Items';
    icon: 'cast';
  };
  attributes: {
    icons: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    >;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeComponentSpecifications extends Struct.ComponentSchema {
  collectionName: 'components_home_component_specifications';
  info: {
    displayName: 'Specifications';
    icon: 'arrowLeft';
  };
  attributes: {
    sufix: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface HomeComponentTestimonialItems extends Struct.ComponentSchema {
  collectionName: 'components_home_component_testimonial_items';
  info: {
    displayName: 'Testimonial Items';
    icon: 'bulletList';
  };
  attributes: {
    designation: Schema.Attribute.String & Schema.Attribute.Required;
    media: Schema.Attribute.Component<
      'utils.s-ingle-media-without-t-ype',
      false
    >;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    quotes: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LayoutFooterNavigations extends Struct.ComponentSchema {
  collectionName: 'components_layout_footer_navigations';
  info: {
    displayName: 'Footer Navigations';
    icon: 'cursor';
  };
  attributes: {
    nav_title: Schema.Attribute.String;
    navigation_links: Schema.Attribute.Component<'utils.link', true>;
  };
}

export interface LayoutOfficeItems extends Struct.ComponentSchema {
  collectionName: 'components_layout_office_items';
  info: {
    displayName: 'Office Items';
  };
  attributes: {
    is_external: Schema.Attribute.Boolean;
    link: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface LayoutOfficeLocations extends Struct.ComponentSchema {
  collectionName: 'components_layout_office_locations';
  info: {
    displayName: 'Office Locations';
    icon: 'cast';
  };
  attributes: {
    office_items: Schema.Attribute.Component<'layout.office-items', true>;
    title: Schema.Attribute.String;
  };
}

export interface LayoutSocialItems extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_items';
  info: {
    displayName: 'Social Items';
    icon: 'cursor';
  };
  attributes: {
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
    media_path: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface LayoutSocialMedia extends Struct.ComponentSchema {
  collectionName: 'components_layout_social_medias';
  info: {
    displayName: 'Social Media';
    icon: 'twitter';
  };
  attributes: {
    items: Schema.Attribute.Component<'layout.social-items', false>;
    title: Schema.Attribute.String;
  };
}

export interface UtilsLink extends Struct.ComponentSchema {
  collectionName: 'components_utils_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    is_external: Schema.Attribute.Boolean;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    link: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface UtilsMedia extends Struct.ComponentSchema {
  collectionName: 'components_utils_media';
  info: {
    displayName: 'Media Without Type';
    icon: 'collapse';
  };
  attributes: {
    desktop_media_path: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    media_alt: Schema.Attribute.String;
    mobile_media_path: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface UtilsMediaWithType extends Struct.ComponentSchema {
  collectionName: 'components_utils_media_with_types';
  info: {
    displayName: 'Media With Type';
    icon: 'database';
  };
  attributes: {
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    media_desktop_path: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    media_mobile_path: Schema.Attribute.Media<'images'> &
      Schema.Attribute.Required;
    media_type: Schema.Attribute.Enumeration<['image', 'video']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'image'>;
    video: Schema.Attribute.Media<'videos'> & Schema.Attribute.Required;
  };
}

export interface UtilsSIngleMediaWIthType extends Struct.ComponentSchema {
  collectionName: 'components_utils_s_ingle_media_w_ith_types';
  info: {
    displayName: 'SIngle Media WIth Type';
    icon: 'book';
  };
  attributes: {
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    media_path: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    media_type: Schema.Attribute.Enumeration<['image', 'video']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'image'>;
  };
}

export interface UtilsSIngleMediaWithoutTYpe extends Struct.ComponentSchema {
  collectionName: 'components_utils_s_ingle_media_without_t_ypes';
  info: {
    displayName: 'SIngle Media Without tYPE';
    icon: 'briefcase';
  };
  attributes: {
    media_alt: Schema.Attribute.String & Schema.Attribute.Required;
    media_path: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.footer': GlobalFooter;
      'global.header': GlobalHeader;
      'home-component.home-about': HomeComponentHomeAbout;
      'home-component.home-banner': HomeComponentHomeBanner;
      'home-component.home-service': HomeComponentHomeService;
      'home-component.home-testimonials': HomeComponentHomeTestimonials;
      'home-component.service-items': HomeComponentServiceItems;
      'home-component.specifications': HomeComponentSpecifications;
      'home-component.testimonial-items': HomeComponentTestimonialItems;
      'layout.footer-navigations': LayoutFooterNavigations;
      'layout.office-items': LayoutOfficeItems;
      'layout.office-locations': LayoutOfficeLocations;
      'layout.social-items': LayoutSocialItems;
      'layout.social-media': LayoutSocialMedia;
      'utils.link': UtilsLink;
      'utils.media': UtilsMedia;
      'utils.media-with-type': UtilsMediaWithType;
      'utils.s-ingle-media-w-ith-type': UtilsSIngleMediaWIthType;
      'utils.s-ingle-media-without-t-ype': UtilsSIngleMediaWithoutTYpe;
    }
  }
}
